import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

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
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            WORK WISE
          </Typography>
          <Button color="inherit" onClick={() => router.push("/")}>
            Chat
          </Button>
          <Button color="inherit" onClick={() => router.push("/")}>
            Meet
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
