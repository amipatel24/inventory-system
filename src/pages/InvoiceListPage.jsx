import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import InvoiceList from "../Components/Invoice/InvoiceList/InvoiceList";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function InvoiceListPage() {
  const InvoiceData = useSelector((state) => state?.InvoiceData);
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
    if (InvoiceData?.SucessMessageOfInvoiceDelete?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      window.location.reload();
    }
  }, [InvoiceData?.SucessMessageOfInvoiceDelete?.statusCode]);
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {InvoiceData?.SucessMessageOfInvoiceDelete?.message}
        </Alert>
      </Snackbar>
      <InvoiceList />
    </div>
  );
}

export default InvoiceListPage;
