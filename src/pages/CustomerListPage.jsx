import React, { useEffect } from "react";
import CustomerList from "../Components/Customer/CustomerList/CustomerList";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomerListPage() {
  const CustomerData = useSelector((state) => state?.CustomerList);
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
    if (CustomerData?.SuccessMessageOfCustomerDeleted?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/customer_list");
        window.location.reload();
      }, 2000);
    }
  }, [CustomerData?.SuccessMessageOfCustomerDeleted?.statusCode,navigate]);
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {CustomerData?.SuccessMessageOfCustomerDeleted?.message}
        </Alert>
      </Snackbar>
      <CustomerList />
    </div>
  );
}

export default CustomerListPage;
