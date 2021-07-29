import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { removeAlert } from "../Stores/Alerts/actions";

export default function SuccessSnackbar() {
  const dispatch = useDispatch();
  const { confirmSnackBarMessage, confirmSnackBarOpen, confirmOnAllow, confirmOnReject } = useSelector(
    (state) => state.alertProviderReducer
  );

  function handleClose() {
    dispatch(removeAlert("confirmation"));
  }

  function handleReject() {
    // eslint-disable-next-line
    if(typeof confirmOnReject === "function") {
      confirmOnReject();
      return handleClose();
    };
    return handleClose();
  }

  async function handleAllow() {
    // eslint-disable-next-line
    if(typeof confirmOnAllow === "function") {
      confirmOnAllow();
      return handleClose();
    }
    handleClose();
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={confirmSnackBarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      aria-describedby="client-warning-snackbar"
    >
      <Alert onClose={handleClose} severity="warning">
        {confirmSnackBarMessage}
        <div style={{marginTop: '10px'}}>
          <button className="btn btn-sm btn-success" onClick={handleReject}>Cancel</button>
          <button className="btn btn-sm btn-danger" onClick={handleAllow}>Ok</button>
        </div>
      </Alert>
    </Snackbar>
  );
}
