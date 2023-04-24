import React, { useEffect } from "react";
import AddCustomer from "../Components/Customer/AddCustomer/AddCustomer";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddCustomerPage() {
  const Customers = useSelector((state) => state?.CustomerList);
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  useEffect(() => {
    if (Customers?.SucessMessage?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/customer_list");
      }, 2000);
    }
  }, [
    Customers?.SucessMessage?.message,
    Customers?.SucessMessage?.statusCode,
    navigate,
  ]);
  useEffect(() => {
    if (Customers?.ErrorMessage?.data?.statusCode === 400) {
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
  }, [
    Customers?.ErrorMessage?.data?.statusCode,
    Customers?.ErrorMessage?.data?.message,
  ]);
  return (
    <div>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        {Customers?.SucessMessage?.message ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {Customers?.SucessMessage?.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {Customers?.ErrorMessage?.data?.message}
          </Alert>
        )}
      </Snackbar>
      <AddCustomer />
    </div>
  );
}

export default AddCustomerPage;
