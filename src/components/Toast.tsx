import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useAppContext } from "../context/AppContext";

const Toast: React.FC = () => {
  const { toast, closeToast } = useAppContext();

  if (!toast) return null;

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={6000}
      onClose={closeToast}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={closeToast} severity={toast.severity} sx={{ width: "100%" }}>
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;