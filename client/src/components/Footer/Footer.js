import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";


const Footer = () => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Register"
            icon={<HowToRegIcon />}
            onClick={() => handleNavigation("/register")}
          />
          <BottomNavigationAction
            label="Login"
            icon={<LoginIcon />}
            onClick={() => handleNavigation("/login")}
          />
          <BottomNavigationAction
            label="Logout"
            icon={<LogoutIcon />}
            onClick={() => handleNavigation("/")}
          />
          <BottomNavigationAction
            label="Profile"
            icon={<AccountBoxIcon />}
            onClick={() => handleNavigation("/profile")}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Footer;
