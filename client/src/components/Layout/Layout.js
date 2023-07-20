import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children, changeMode }) => {
  return (
    <div>
      <Header changeMode={changeMode}/>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
