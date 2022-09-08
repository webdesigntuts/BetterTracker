import { useEffect } from "react";
import { useUser } from "../queries/user";
import { queryClient } from "../constants/config";

import { useLocation, useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const {
    data: user,
    isLoading: userLoading,
    isRefetching: userRefetching,
  } = useUser();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.data?.userId) {
      console.log("user", user);
      if (location.pathname === "/auth" || location.pathname === "/register") {
        navigate("/");
      } else navigate(location.pathname);
    }

    if (!userLoading && !user?.data && !userRefetching) {
      if (location.pathname !== "/auth" && location.pathname !== "/register") {
        queryClient.removeQueries();
        navigate("/auth");
        return;
      }
      return;
    }
  }, [user, userLoading, userRefetching]);

  return <>{userLoading ? <div>Loading...</div> : children}</>;
};

export default AuthGuard;
