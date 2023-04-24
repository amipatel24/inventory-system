/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
// import data from "../../../dummy/data.json";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { InvoiceListAction } from "../../../Store/Action/InvoiceAction/index";
import CircularProgress from "@mui/material/CircularProgress";
import { convert } from "../../../Helpers/misc";
import UsePagination from "../../../Helpers/pagination/Pagination";
import { DeleteInvoice } from "../../../Store/Action/InvoiceAction/index";
import DialogBox from "../../../Helpers/DialogBox/DialogBox";

function InvoiceList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const InvoiceData = useSelector((state) => state?.InvoiceData);
  let limit = 2;
  const [open, setOpen] = useState(false);
  const data = [];
  console.log("successLoginData", successLoginData?.LoginData);
  const [pageNumber, setPageNumber] = useState();
  const [search, setSearch] = useState();
  const [shorting, setShorting] = useState();
  const [shortingIcon, setShortingIcon] = useState("Sr.No");
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  InvoiceData.invoiceList.map((e) => {
    let elements = {};
    elements["Sr.No"] = e.sr_no;
    elements["BILL No"] = e.bill_no < 10 ? ` 0${e.bill_no}` : e.bill_no;
    elements["Invoice Date"] = convert(e.invoice_date);
    elements["Name"] = e.customer_name;
    elements["Total Amount"] = e.bill_amount;
    data.push(elements);
  });

  useEffect(() => {
    if (accessToken?.accessToken) {
      dispatch(
        InvoiceListAction({
          limit: limit,
          pageNumber: pageNumber,
          orderByString: shorting,
        })
      );
      localStorage.setItem("InvoiceEditPageData", JSON.stringify([{}]));
    }
  }, [accessToken?.accessToken, dispatch, pageNumber, shorting, limit]);
  // eslint-disable-next-line array-callback-return

  const headalEdit = (data) => {
    navigate(
      `/InvoiceList/edit/${InvoiceData.invoiceList[data - 1]?.invoice_id}`
    );
  };

  const finalDelete = () => {
    setOpen(false);
    dispatch(DeleteInvoice(InvoiceData.invoiceList[open - 1]?.invoice_id));
  };
  const headalShorting = (data_a) => {
    shortingIcon === data_a
      ? setShortingIcon(`D ${data_a}`)
      : setShortingIcon(data_a);
    switch (data_a) {
      case "Sr.No":
        if (shorting === "sr_no") {
          setShorting(null);
        } else {
          setShorting("sr_no");
        }
        return "done";
      case "BILL No":
        if (shorting === "ASC/bill_no") {
          setShorting("DESC/bill_no");
        } else {
          setShorting("ASC/bill_no");
        }
        return "done";
      case "Invoice Date":
        if (shorting === "ASC/invoice_date") {
          setShorting("DESC/invoice_date");
        } else {
          setShorting("ASC/invoice_date");
        }
        return "done";
      case "Name":
        if (shorting === "ASC/customer_name") {
          setShorting("DESC/customer_name");
        } else {
          setShorting("ASC/customer_name");
        }
        return "done";
      case "Total Amount":
        if (shorting === "ASC/bill_amount") {
          setShorting("DESC/bill_amount");
        } else {
          setShorting("ASC/bill_amount");
        }
        return "done";
      default:
        setShorting(null);
        return " state";
    }
  };

  const searchHeadal = (e) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        InvoiceListAction({
          search: search,
          limit: limit,
          pageNumber: pageNumber,
        })
      );
    }
  };

  return (
    <div>
      <DialogBox
        setOpen={setOpen}
        open={open}
        DialogText={"Are you sure you want to Delete this invoice?"}
        finalDelete={finalDelete}
      />
      {InvoiceData?.invoiceList?.length ? (
        <Container fixed>
          <Header
            name={"InvoiceList"}
            SearchBar={true}
            searchHeadal={searchHeadal}
            onKeyDown={onKeyDown}
          />
          <Container fixed sx={{ backgroundColor: "#EAEFF2" }}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
              spacing={4}
              sx={{ p: 4 }}
            >
              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => navigate("/addinvoice")}
              >
                add invoice
              </Button>
              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/viewdeletedinvoice ");
                }}
              >
                view deleted invoice
              </Button>
            </Stack>

            <Table
              data={data}
              headalEdit={headalEdit}
              headalDelete={setOpen}
              headalShorting={headalShorting}
              ShortingHide={shortingIcon}
            />
            <Stack
              sx={{
                margin: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                padding: "20px  0 20px 20px",
              }}
            >
              <UsePagination
                countNumbuer={Math.ceil(
                  InvoiceData.invoiceList[0]?.total_count / limit
                )}
                PageNumber={setPageNumber}
                currentPage={pageNumber}
              />
            </Stack>
          </Container>
        </Container>
      ) : (
        <Stack
          sx={{ color: "grey.500", height: "80vh" }}
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="success" size="5rem" />
        </Stack>
      )}
    </div>
  );
}

export default InvoiceList;
