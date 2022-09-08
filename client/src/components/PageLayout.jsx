import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PageLayout;
