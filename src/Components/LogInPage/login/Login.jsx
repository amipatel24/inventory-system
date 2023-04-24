import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField, DialogContent, DialogTitle } from "@mui/material";
import Stack from "@mui/material/Stack";
import "./Login.css";
import Button from "@mui/material/Button";
import { userLogin } from "../../../Store/Action/AuthAction/index";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login(props) {
  const showToastMessage = () => {
    toast.success("Login  Success  !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  const showToastMessageServerError = () => {
    toast.error("server is offline  !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  const showToastMessageError = (data) => {
    toast.error(`${data} !`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const { setOpen } = props;
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [test, setTest] = useState(null);
  const [buttonDisbel, setButtonDisbel] = useState(null);
  const [password, setpassWord] = useState(null);
  const LoginInfo = {
    email: email,
    password: password,
  };
  const handleSubmit = () => {
    setButtonDisbel(true);
    setTest(true);
    dispatch(userLogin(LoginInfo));
  };

  const navigate = useNavigate();
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  console.log("successLoginData", successLoginData?.FailedLoginData);

  useEffect(() => {
    if (successLoginData.LoginData.statusCode === "200" && test) {
      localStorage.setItem(
        "LoginData",
        JSON.stringify(successLoginData.LoginData)
      );
      showToastMessage();
      setTimeout(() => {
        if (successLoginData.LoginData.role_id === 2) {
          navigate("/productList");
        } else {
          if (successLoginData.LoginData.role_id === 1) {
            navigate("/userlist");
          }
        }
      }, 2000);
      setTest(false);
      setButtonDisbel(false);
    } else if (
      successLoginData?.FailedLoginData?.status === "server_offline" &&
      test
    ) {
      showToastMessageServerError();
      setButtonDisbel(false);
    } else if (successLoginData?.FailedLoginData?.status === "failed" && test) {
      showToastMessageError(successLoginData?.FailedLoginData?.message);
      setButtonDisbel(false);
    }
  }, [
    navigate,
    successLoginData?.FailedLoginData,
    successLoginData.LoginData,
    successLoginData.LoginData.statusCode,
    test,
  ]);

  return (
    <div>
      <div>
        <DialogContent>
          <ToastContainer />
          <Stack direction="row" justifyContent="center" alignItems="center">
            <DialogTitle>LogIn</DialogTitle>
          </Stack>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Stack direction="column" spacing={2}>
              <TextField
                required
                id="outlined-Email"
                label="Email id"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}

                // defaultValue="Hello World"
              />

              <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setpassWord(e.target.value)}
              />
            </Stack>
          </Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button
              disabled={buttonDisbel}
              variant="contained"
              color="success"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setOpen(false);
              }}
            >
              cancel
            </Button>
          </Stack>
        </DialogContent>
      </div>
    </div>
  );
}

export default Login;
