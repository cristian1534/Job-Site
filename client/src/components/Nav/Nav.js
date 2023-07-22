import React from "react";
import { Box, Button } from "@mui/material";
import { Link as Scroll } from "react-scroll";
import EmailIcon from "@mui/icons-material/Email";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

const Nav = () => {
  return (
    <Box
      position="fixed"
      left="5px"
      zIndex={1000}
      transform="translate(-50%, 0)"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Scroll to="candidates">
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: "180px" }}
          >
            <HowToRegIcon />
          </Button>
        </Scroll>
        <Scroll to="how">
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: "180px" }}
          >
            <HelpCenterIcon />
          </Button>
        </Scroll>
        <Scroll to="contact">
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: "180px" }}
          >
            <EmailIcon />
          </Button>
        </Scroll>
        <Scroll to="top">
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: "180px" }}
          >
            <KeyboardDoubleArrowUpIcon />
          </Button>
        </Scroll>
      </div>
    </Box>
  );
};

export default Nav;
