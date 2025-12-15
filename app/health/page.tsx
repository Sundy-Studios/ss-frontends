"use client";

import React from "react";
import Loading from "@/components/Loading";
import { useHealth } from "@/hooks/useHealth";
import { Paper, Typography, Box } from "@mui/material";

const HealthStatusPage: React.FC = () => {
  const { status, loading } = useHealth();

  if (loading) return <Loading />;

  const displayStatus = status?.status ? "Healthy" : "Unhealthy";
  const displayTimestamp = status?.timestamp
    ? new Date(status.timestamp)
    : new Date();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Health Status
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Status: {displayStatus}</Typography>
          <Typography>
            Timestamp: {displayTimestamp.toLocaleString()}
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default HealthStatusPage;
