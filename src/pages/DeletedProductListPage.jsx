import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import DeletedProductList from "../Components/Product/DeletedProductList/DeletedProductList";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DeletedProductListPage() {
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
        navigate("/deletedproduct");
        window.location.reload();
      }, 2000);
    }
  }, [productData?.SuccessMessageProductDelete?.statusCode,navigate]);
  return (
    <div>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {productData?.SuccessMessageProductDelete?.message}
        </Alert>
      </Snackbar>
      <DeletedProductList />
    </div>
  );
}

export default DeletedProductListPage;
