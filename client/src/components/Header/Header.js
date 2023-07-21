import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import { userContext } from "../user/User";

export default function Header({ changeMode, darkMode }) {
  const { currentUser } = useContext(userContext);
  

  const router = useRouter();
  const sunIconStyle = {
    color: "#fff",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => router.push("/")}
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textAlign: "start",
              cursor: "pointer",
            }}
          >
            WORK WISE
          </Typography>
          {currentUser && (
            <div>
              <Button color="inherit" onClick={() => router.push("/")}>
                Chat
              </Button>
              <Button color="inherit" onClick={() => router.push("/")}>
                Meet
              </Button>
            </div>
          )}
          <IconButton onClick={() => changeMode()}>
            {darkMode ? (
              <Brightness4Icon />
            ) : (
              <Brightness7Icon sx={sunIconStyle} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}