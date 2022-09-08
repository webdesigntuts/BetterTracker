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
  const { data: user, isLoading: userLoading } = useUser();
  const value = { auth, setAuth };
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.data?.userId) {
      console.info("SET AUTH");
      setAuth(true);
    }

    if (!auth && !userLoading) {
      if (location.pathname !== "/auth") {
        console.log("nav to auth");
        queryClient.removeQueries();
        navigate("/auth");
        return;
      }
      return;
    }
  }, [user, auth, userLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
export { AuthContext, AuthProvider, useAuth };
