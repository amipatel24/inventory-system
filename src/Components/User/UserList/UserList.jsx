import React, { useEffect, useState } from "react";
// import data from "../../../dummy/data.json";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  userListAction,
  userDeleteAction,
} from "../../../Store/Action/UserAction/index";
import CircularProgress from "@mui/material/CircularProgress";
import UsePagination from "../../../Helpers/pagination/Pagination";

function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const User = useSelector((state) => state?.User);
  let limit = 2;
  const [search, setSearch] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [shorting, setShorting] = useState();
  const [shortingIcon, setShortingIcon] = useState("Sr. No");
  const data = [];

  console.log("User", User, "test");

  useEffect(() => {
    dispatch(
      userListAction({
        limit: limit,
        pageNumber: pageNumber,
        orderByString: shorting,
      })
    );
  }, [dispatch, limit, pageNumber, shorting]);

  // eslint-disable-next-line array-callback-return
  User.UserData.map((e) => {
    let elements = {};
    elements["Sr. No"] = e.sr_no < 10 ? ` 0${e.sr_no}` : e.sr_no;
    elements["Name"] = e.name;
    elements["Email Id"] = e.email;
    elements["Mobile no"] = e.mobile_no;
    data.push(elements);
  });

  const headalEdit = (data) => {
    navigate(`/user/edit/${User.UserData[data - 1]?.user_uuid}`);
  };

  const headalDelete = (data) => {
    if (window.confirm("Are you sure you want to Delete this Product?")) {
      dispatch(userDeleteAction(User.UserData[data - 1]?.user_id));
    }
    // window.location.reload();
  };

  const searchHeadal = (e) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        userListAction({ search: search, limit: limit, pageNumber: pageNumber })
      );
    }
  };
  console.log(search);
  console.log("setShortingData", shorting);

  const headalShorting = (data_a) => {
    shortingIcon === data_a ? setShortingIcon(null) : setShortingIcon(data_a);
    switch (data_a) {
      case "Sr. No":
        if (shorting === "sr_no") {
          setShorting(null);
        } else {
          setShorting("sr_no");
        }
        return "done";
      case "Name":
        if (shorting === "name") {
          setShorting(null);
        } else {
          setShorting("name");
        }
        return "done";
      case "Email Id":
        if (shorting === "email") {
          setShorting(null);
        } else {
          setShorting("email");
        }
        return "done";
      case "Mobile no":
        if (shorting === "mobile_no") {
          setShorting(null);
        } else {
          setShorting("mobile_no");
        }
        return "done";
      default:
        setShorting(null);
        return " state";
    }
  };

  return (
    <div>
      {User?.UserData?.length ? (
        <Container fixed sx={{ Width: 100 }}>
          <Header
            name={"User List"}
            SearchBar={true}
            searchHeadal={searchHeadal}
            onKeyDown={onKeyDown}
          />
          <Container fixed sx={{ backgroundColor: "#EAEFF2", Width: 150 }}>
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
                  navigate("/adduser");
                }}
              >
                add User
              </Button>

              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/userdeletelist");
                }}
              >
                view deleted User
              </Button>
            </Stack>

            <Table
              data={data}
              headalEdit={headalEdit}
              headalDelete={headalDelete}
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
                countNumbuer={Math.ceil(User.UserData[0]?.total_count / limit)}
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

export default UserList;
