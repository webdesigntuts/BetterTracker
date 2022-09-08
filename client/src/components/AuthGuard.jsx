import { useEffect } from "react";
import { useUser } from "../queries/user";
import { queryClient } from "../constants/config";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
const AuthGuard = ({ children }) => {
  const {
    data: user,
    isLoading: userLoading,
    isRefetching: userRefetching,
  } = useUser();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.data?.userId) {
      if (pathname === "/auth" || pathname === "/register") {
        navigate("/");
      } else navigate(pathname);
    }

    if (!userLoading && !user?.data && !userRefetching) {
      if (pathname !== "/auth" && pathname !== "/register") {
        queryClient.removeQueries();
        navigate("/auth");
        return;
      }
      return;
    }
  }, [user, userLoading, userRefetching, pathname]);

  return (
    <>
      {userLoading ? <Spinner background={"tranparent"} fullPage /> : children}
    </>
  );
};

export default AuthGuard;
