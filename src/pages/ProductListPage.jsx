import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductLisit from "../Components/Product/ProductList/ProductList";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddProductPage() {
  const productData = useSelector((state) => state?.ProductList);
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
    if (productData?.SuccessMessageProductDelete?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/productlist");
        window.location.reload();
      }, 2000);
    }
  }, [productData?.SuccessMessageProductDelete?.statusCode, navigate]);
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {productData?.SuccessMessageProductDelete?.message}
        </Alert>
      </Snackbar>
      <ProductLisit />
    </div>
  );
}

export default AddProductPage;
