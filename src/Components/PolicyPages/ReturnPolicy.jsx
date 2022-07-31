import { Box, Paper } from "@mui/material";
import React from "react";

const ReturnPolicy = () => {
  return (
    <Box sx={{ width: "80%", mx: "auto", mt: 4 }}>
      <Paper sx={{ px: 3, py: 2, mb: 5 }}>
        <h2 style={{ textAlign: "center", color: "#e85d04" }}>Return Policy</h2>
      </Paper>
    </Box>
  );
};

export default ReturnPolicy;