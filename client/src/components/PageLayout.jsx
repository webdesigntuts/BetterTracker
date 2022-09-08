import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import MobileNavbar from "./Navbar/MobileNavbar";

const PageLayout = () => {
  return (
    <>
      <Navbar />
      <MobileNavbar />
      <Outlet />
    </>
  );
};

export default PageLayout;
