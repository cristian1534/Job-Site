import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout/Layout";
import Darkmode from "darkmode-js";

const options = {
  bottom: "10%",
  right: "1rem",
  left: "unset",
  time: "0.5s",
  mixColor: "#fff",
  buttonColorDark: "#100f2c",
  buttonColorLight: "#fff",
  saveInCookies: true,
  label: "🌓",
  autoMatchOsTheme: true,
};

const darkmode = new Darkmode(options);
darkmode.showWidget();

export default function App({ Component, pageProps }) {
  const [isDark, setIsDark] = useState(darkmode.isActivated());

  useEffect(() => {
    darkmode.button.addEventListener("click", () => {
      let darkmodeActive = darkmode.isActivated();
      setIsDark(darkmodeActive);
      document.body.classList.toggle("dark-mode", darkmodeActive);
    });
  }, [setIsDark]);

  return (
    <Layout >
      <Component {...pageProps} isDark={isDark} />
    </Layout>
  );
}
