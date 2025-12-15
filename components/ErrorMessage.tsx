import React from "react";
import { Alert } from "@mui/material";

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => (
  <Alert severity="error" sx={{ mt: 2 }}>
    {message}
  </Alert>
);

export default ErrorMessage;
