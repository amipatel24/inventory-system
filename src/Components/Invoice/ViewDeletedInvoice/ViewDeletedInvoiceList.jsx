import React, { useEffect, useState } from "react";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import { Stack, Button, Container, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  GetDeletedInvoiceList,
  PermanentDeleteInvoice,
} from "../../../Store/Action/InvoiceAction/index";
import UsePagination from "../../../Helpers/pagination/Pagination";
import { convert } from "../../../Helpers/misc";
import DialogBox from "../../../Helpers/DialogBox/DialogBox";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ViewDeletedInvoiceList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const DeletedInvoiceList = useSelector((state) => state?.InvoiceData);
  const [openPopep, setOpenPopep] = useState(false);
  const data = [];
  let limit = 2;
  const [pageNumber, setPageNumber] = useState();
  const [shorting, setShorting] = useState();
  const [shortingIcon, setShortingIcon] = useState("BILL No");
  const [search, setSearch] = useState();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  // eslint-disable-next-line array-callback-return
  DeletedInvoiceList?.DeletedInvoiceList?.map((e) => {
    let elements = {};
    elements["BILL No"] = e.bill_no < 10 ? ` 0${e.bill_no}` : e.bill_no;
    elements["Invoice Date"] = convert(e.invoice_date);
    elements["Name"] = e.customer_name;
    elements["Total Amount"] = e.bill_amount;
    data.push(elements);
  });
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  console.log("DeletedInvoiceList", DeletedInvoiceList?.DeletedInvoiceList);

  useEffect(() => {
    if (
      DeletedInvoiceList?.SucessMessageOfInvoiceDelete?.statusCode === "200"
    ) {
      setState({ open: true, vertical: "top", horizontal: "center" });
      window.location.reload();
    }
  }, [DeletedInvoiceList?.SucessMessageOfInvoiceDelete?.statusCode]);

  useEffect(() => {
    dispatch(
      GetDeletedInvoiceList({
        limit: limit,
        pageNumber: pageNumber,
        orderByString: shorting,
      })
    );
  }, [dispatch, limit, pageNumber, shorting]);
  const searchHeadal = (e) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        GetDeletedInvoiceList({
          search: search,
          limit: limit,
          pageNumber: pageNumber,
        })
      );
    }
  };

  const headalShorting = (data_a) => {
    shortingIcon === data_a
      ? setShortingIcon("Sr. No")
      : setShortingIcon(data_a);
    switch (data_a) {
      case "BILL No":
        if (shorting === "bill_no") {
          setShorting(null);
        } else {
          setShorting("bill_no");
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
  const finalDelete = () => {
    setOpenPopep(false);
    dispatch(
      PermanentDeleteInvoice(
        DeletedInvoiceList?.DeletedInvoiceList[openPopep - 1]?.invoice_id
      )
    );
  };
  return (
    <div>
      <DialogBox
        setOpen={setOpenPopep}
        open={openPopep}
        DialogText={"Are you sure you want to Delete this invoice?"}
        finalDelete={finalDelete}
      />
      {!DeletedInvoiceList?.Loader ? (
        DeletedInvoiceList?.DeletedInvoiceList?.length ? (
          <Container fixed>
            <Header
              name={"Delete Invoice List"}
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
                  onClick={() => {
                    navigate("/invoice_list");
                  }}
                >
                  back
                </Button>

                <Button
                  variant="text"
                  color="success"
                  sx={{ fontSize: 16 }}
                  onClick={() => {
                    navigate("/addinvoice");
                  }}
                >
                  Add Invoice{" "}
                </Button>
              </Stack>
              <Table
                data={data}
                headalDelete={setOpenPopep}
                hide={true}
                headalShorting={headalShorting}
                ShortingHide={shortingIcon}
              />
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                key={vertical + horizontal}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  {DeletedInvoiceList?.SucessMessageOfInvoiceDelete?.message}
                </Alert>
              </Snackbar>
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
                    DeletedInvoiceList?.DeletedInvoiceList[0]?.total_count /
                      limit
                  )}
                  PageNumber={setPageNumber}
                  currentPage={pageNumber}
                />
              </Stack>
            </Container>
          </Container>
        ) : (
          <Container fixed>
            <Header
              name={"Delete Invoice List"}
              SearchBar={false}
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
                  onClick={() => {
                    navigate("/invoice_list");
                  }}
                >
                  back
                </Button>

                <Button
                  variant="text"
                  color="success"
                  sx={{ fontSize: 16 }}
                  onClick={() => {
                    navigate("/addinvoice");
                  }}
                >
                  Add Invoice
                </Button>
              </Stack>
              <h1 style={{ textAlign: "center", color: "red", margin: 0 }}>
                No any record found of Deleted Invoice
              </h1>
            </Container>
          </Container>
        )
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
