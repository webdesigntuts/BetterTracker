import MainContainer from "./Containers/MainContainer";
import { Title } from "./Titles/Titles";
import Navbar from "./Navbar/Navbar";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../context/AuthProvider";

const ProtectedRoutes = () => {
  const { auth } = useAuth();
  const authHandler = () => {
    switch (auth) {
      default:
        return (
          <MainContainer>
            <Title>Loading..</Title>
          </MainContainer>
        );
      case true:
        return (
          <>
            <Navbar />
            <Outlet />
          </>
        );
      case false:
        return <Navigate to='/auth' />;
    }
  };

  return authHandler(auth);
};

export default ProtectedRoutes;
