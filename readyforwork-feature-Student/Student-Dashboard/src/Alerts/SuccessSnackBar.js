import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { removeAlert } from "../Stores/Alerts/actions";

export default function SuccessSnackbar() {
  const dispatch = useDispatch();
  const { successSnackBarMessage, successSnackBarOpen } = useSelector(
    (state) => state.alertProviderReducer
  );

  function handleClose() {
    dispatch(removeAlert("success"));
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={successSnackBarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      aria-describedby="client-success-snackbar"
    >
      <Alert onClose={handleClose} severity="success">
        {successSnackBarMessage}
      </Alert>
    </Snackbar>
  );
}
