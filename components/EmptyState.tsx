import React from "react";
import { Typography, Box } from "@mui/material";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "Item not found",
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        p: 2,
      }}
    >
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
