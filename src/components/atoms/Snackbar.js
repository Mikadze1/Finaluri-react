import React from "react";
import { Alert, Snackbar as MUISnackbar } from "@mui/material"

export const Snackbar = ({ 
  message, 
  autoHideDuration = 3000, 
  anchorOrigin = {
    vertical: "bottom", 
    horizontal: "left"
  },
  onClose,
  severity = "success",
}) => {
  return(
    <MUISnackbar
      open={Boolean(message)}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
    >
      <Alert
      onClose={onClose}
      severity={severity}
      variant="filled"
      sx={{ width: "100%" }}>
        {message}
      </Alert>
  </MUISnackbar>
  )
}

