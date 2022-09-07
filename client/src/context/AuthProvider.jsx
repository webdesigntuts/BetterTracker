import { createContext, useState, useEffect } from "react";
import { useUser } from "../queries/user";
import { queryClient } from "../constants/config";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext({
  auth: false,
  setAuth: () => {},
});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  const { data: user, isError } = useUser();
  const value = { auth, setAuth };

  const Navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth) {
      queryClient.removeQueries();
      return;
    }

    if (user?.data?.userId) setAuth(true);
  }, [user, isError, auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
export { AuthContext, AuthProvider, useAuth };
