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
import { useContext } from "react";
import { userContext } from "../user/User";
import { firebaseApp } from "@/database/config";

const Footer = () => {
  const [value, setValue] = useState(0);
  const { currentUser } = useContext(userContext);
  const ref = useRef(null);
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const logout = async () => {
    try {
      await firebaseApp
        .auth()
        .signOut()
        .then(() => {
         router.push("/login");
        });
    } catch (err) {
      return err.message;
    }
  };

  const iconContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#1976d2",
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
            key="logout"
            icon={
              <div style={iconContainerStyle}>
                <LogoutIcon />
                <span>Logout</span>
              </div>
            }
            onClick={() => logout()}
          />

          <BottomNavigationAction
            key="profile"
            icon={
              <div style={iconContainerStyle}>
                <AccountBoxIcon />
                <span>Profile</span>
              </div>
            }
            onClick={() => handleNavigation("/profile")}
          />
          {!currentUser && (
            <div>
              <BottomNavigationAction
                key="register"
                icon={
                  <div style={iconContainerStyle}>
                    <HowToRegIcon />
                    <span>Register</span>
                  </div>
                }
                onClick={() => handleNavigation("/register")}
              />

              <BottomNavigationAction
                key="login"
                icon={
                  <div style={iconContainerStyle}>
                    <LoginIcon />
                    <span>Login</span>
                  </div>
                }
                onClick={() => handleNavigation("/login")}
              />
            </div>
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Footer;
