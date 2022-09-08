import { createContext, useState, useEffect } from "react";
import { useUser } from "../queries/user";
import { queryClient } from "../constants/config";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext({
  auth: false,
  setAuth: () => {},
});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  const {
    data: user,
    isLoading: userLoading,
    isRefetching: userRefetching,
  } = useUser();
  const value = { auth, setAuth };
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

  return (
    <AuthContext.Provider value={value}>
      {userLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
export { AuthContext, AuthProvider, useAuth };
