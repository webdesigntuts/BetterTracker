import { createContext, useState, useEffect } from "react";
import { useUser } from "../queries/user";
import { queryClient } from "../constants/config";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  auth: false,
  setAuth: () => {},
});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  const { data, isError } = useUser();
  const value = { auth, setAuth };

  const Navigate = useNavigate();

  useEffect(() => {
    if (data) {
      if (data?.data?.userId) setAuth(true);
    }
    if (isError) {
      setAuth(false);
      queryClient.removeQueries();
    }
  }, [data, isError, Navigate]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
