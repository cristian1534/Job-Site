import React from "react";
import { Button, Box } from "@mui/material";


const GlobalError = ({ error, reset }) => {
    
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box display="flex" justifyContent="center" flexDirection="column">
        <h2>Temporally out of service</h2>
        <Button variant="contained" style={{ borderRadius: " 180px", marginTop: "3rem"}} onClick={() => reset()}>
          Reload Page
        </Button>
      </Box>
    </div>
  );
};

export default GlobalError;

