import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PositionedSnackbar(props) {
  const { alertMessage, alertErrorMessage, state, setState } = props;
  
  const { vertical, horizontal, open } = state;
  
  const handleClose = () => {
      setState({ ...state, open: false });
    };
    let AlertText = alertMessage ? alertMessage : alertErrorMessage;
    console.log("AlertText",AlertText,"alertMessage",alertMessage,"alertErrorMessage",alertErrorMessage );
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity={alertMessage ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {AlertText}
        </Alert>
      </Snackbar>
    </div>
  );
}
