import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import { Provider } from "react-redux";
import reduxStore from "../redux/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";
import { firebaseApp } from "@/database/config";
import { FirebaseAppProvider } from "reactfire";
import { UserProvider } from "@/components/user/User";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

export default function App({ Component, pageProps, router }) {
  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const changeMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const isLoginPage =
    router.pathname === "/login" || router.pathname === "/register";

  return (
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <UserProvider>
          <Provider store={reduxStore}>
            {!isLoginPage && (
              <Layout changeMode={changeMode}>
                {
                  (router.pathname === "/" ? (
                    <PrivateRoute>
                      <Component {...pageProps} />
                    </PrivateRoute>
                  ) : (
                    <Component {...pageProps} />
                  ))
                }
              </Layout>
            )}
            {isLoginPage && <Component {...pageProps} />}
          </Provider>
        </UserProvider>
      </ThemeProvider>
    </FirebaseAppProvider>
  );
}
