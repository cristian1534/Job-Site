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
import Loader from "../components/Loader/Loader";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  weight: "400",
});

export default function App({ Component, pageProps, router }) {
  const [darkMode, setDarkMode] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

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

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      setAuthLoading(false);
    });
  }, []);

  const authRequired = ["/"];

  const isLoginPage = router.pathname === "/login";
  const isRegisterPage = router.pathname === "/register";
  const isRecoverPage = router.pathname === "/recover";
  const isAuthRequiredPage = authRequired.includes(router.pathname);

  return (
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <UserProvider>
          <Provider store={reduxStore}>
            {authLoading ? (
              <div>
                <Loader />
              </div>
            ) : isAuthRequiredPage ? (
              <PrivateRoute>
                <main className={`${pacifico.variable} font-sans`}>
                  <Layout changeMode={changeMode}>
                    <Component {...pageProps} />
                  </Layout>
                </main>
              </PrivateRoute>
            ) : isLoginPage || isRegisterPage || isRecoverPage ? (
              <Component {...pageProps} />
            ) : (
              <main className={`${pacifico.variable} font-sans`}>
                <Layout changeMode={changeMode}>
                  <Component {...pageProps} />
                </Layout>
              </main>
            )}
          </Provider>
        </UserProvider>
      </ThemeProvider>
    </FirebaseAppProvider>
  );
}
