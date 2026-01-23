import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../../components/layoutcomponents/Header";
import Footer from "../../components/layoutcomponents/Footer";

const Layout = () => {
  return (
    <div>
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
