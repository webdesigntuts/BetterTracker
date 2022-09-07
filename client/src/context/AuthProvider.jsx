import { createContext, useState, useEffect } from "react";
import { useUser } from "../queries/user";
import { queryClient } from "../constants/config";
import { useContext } from "react";

const AuthContext = createContext({
  auth: false,
  setAuth: () => {},
});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  const { data: user } = useUser();
  const value = { auth, setAuth };

  useEffect(() => {
    if (!auth) {
      queryClient.removeQueries();
      return;
    }

    if (user?.data?.userId) setAuth(true);
  }, [user, auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
export { AuthContext, AuthProvider, useAuth };
