import React, { useState, useEffect } from "react";
import {
  // AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Dialog,
} from "../../Helpers/indexMui/indexmui";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Login from "../LogInPage/login/Login";
import { Transition } from "../../Helpers/BootstrapButton/BootstrapButton";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header(props) {
  const showToastMessage = () => {
    toast.success("Logout  Success  !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  console.log("successLoginData", successLoginData);
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);
  const { openManu, setOpenManu } = props;

  useEffect(() => {
    if (successLoginData.LoginData.statusCode === "200") {
      setTimeout(() => {
        setOpen(false);
        setOpenManu(true);
      }, 2000);
    }
  }, [setOpenManu, successLoginData.LoginData.statusCode]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  const handleDrawerOpen = () => {
    if (
      successLoginData?.LoginData?.statusCode === "200" ||
      accessToken?.statusCode
    ) {
      setOpenManu(true);
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={openManu}>
          <Toolbar>
            {successLoginData?.LoginData?.statusCode === "200" ||
            accessToken?.statusCode ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(openManu && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              ""
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Inventory
            </Typography>
            {successLoginData.LoginData.statusCode === "200" ||
            accessToken?.statusCode ? (
              <>
                <Typography variant="h5" component="div">
                  Hello, {accessToken?.name}
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ marginLeft: "15px" }}
                >
                  |
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ marginLeft: "15px", cursor: "pointer" }}
                  onClick={() => {
                    showToastMessage();
                    window.localStorage.clear();
                    setTimeout(() => {
                      navigate("/");
                      window.location.reload();
                    }, 5500);
                  }}
                >
                  Log out
                </Typography>
                <ToastContainer />
              </>
            ) : (
              <div>
                <Button
                  color="inherit"
                  onClick={() => {
                    handleClickOpen(true);
                  }}
                >
                  sign in
                </Button>
                <Button color="inherit">sign up</Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <Login setOpen={setOpen} />
        </Dialog>
      </Box>
    </div>
  );
}
