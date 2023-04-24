import React from "react";
import { useEffect } from "react";
import AddInvoice from "../Components/Invoice/AddInvoice/AddInvoice";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddInvoicePage() {
  const InvoicePageData = useSelector((state) => state?.InvoiceData);
  console.log("InvoicePageData?.InvoicePdf", InvoicePageData?.InvoicePdf);
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
    if (InvoicePageData?.InvoicePdf?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/invoice_list");
        window.location.reload();
      }, 4000);
    }
  }, [InvoicePageData?.InvoicePdf?.statusCode, navigate]);
  var b64;
  if (InvoicePageData?.InvoicePdf?.invoicePdf) {
    b64 = InvoicePageData?.InvoicePdf?.invoicePdf;
  }
  if (b64) {
    var obj = document.createElement("object");
    obj.style.width = "100%";
    obj.style.height = "1000pt";
    obj.type = "application/pdf";
    obj.data = "data:application/pdf;base64," + b64;
    var link = document.createElement("a");
    link.download = "invoice.pdf";
    link.href = "data:application/pdf;base64," + b64;
    document.body.appendChild(link);
    setTimeout(() => {
      let pdfWindow = window.open("");
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(b64) +
          "'></iframe>"
      );
    }, 2000);
  }
  return (
    <div>
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        {InvoicePageData?.InvoicePdf?.message ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {InvoicePageData?.InvoicePdf?.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {/* {Customers?.ErrorMessage?.data?.message} */}
          </Alert>
        )}
      </Snackbar>
      <AddInvoice sucessMessage={InvoicePageData?.InvoicePdf?.statusCode} />
    </div>
  );
}

export default AddInvoicePage;
