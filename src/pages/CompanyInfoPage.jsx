import React, { useEffect } from "react";
import EditCompanyInfo from "../Components/Company/EditCompanyInfo/EditCompanyInfo";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CompanyInfoPage() {
  const CompanyInfoData = useSelector((state) => state?.CompanyInfo);
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
    if (CompanyInfoData?.SucessMessageOfEditCompanyInfo?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/company_info");
      }, 2000);
    }
  }, [CompanyInfoData?.SucessMessageOfEditCompanyInfo?.statusCode, navigate]);
  useEffect(() => {
    if (
      CompanyInfoData?.ErrorMessageOfEditComapanyInfo?.data?.statusCode ===
      400
    ) {
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
  }, [
    CompanyInfoData?.ErrorMessageOfEditComapanyInfo?.data?.statusCode,
    CompanyInfoData?.ErrorMessageOfEditComapanyInfo?.data?.message,
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
        {CompanyInfoData?.SucessMessageOfEditCompanyInfo?.message ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {CompanyInfoData?.SucessMessageOfEditCompanyInfo?.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {CompanyInfoData?.ErrorMessageOfEditComapanyInfo?.data?.message}
          </Alert>
        )}
      </Snackbar>
      <EditCompanyInfo />
    </div>
  );
}

export default CompanyInfoPage;
