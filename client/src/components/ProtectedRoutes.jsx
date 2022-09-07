import MainContainer from "./Containers/MainContainer";
import { Title } from "./Titles/Titles";

import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const ProtectedRoutes = () => {
  const { auth } = useContext(AuthContext);
  const authHandler = () => {
    switch (auth) {
      default:
        return (
          <MainContainer>
            <Title>Loading..</Title>
          </MainContainer>
        );
      case true:
        return <Outlet />;
      case false:
        return <Navigate to="/auth" />;
    }
  };

  return authHandler(auth);
};

export default ProtectedRoutes;
