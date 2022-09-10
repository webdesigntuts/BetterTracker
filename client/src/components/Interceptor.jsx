import React, { useEffect } from "react";
import { queryClient } from "../constants/config";
import Axios from "../utils/Axios";

const SetupInterceptor = () => {
  const InterceptorID = Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401) {
        queryClient.refetchQueries("user");
        Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  );
  return InterceptorID;
};

const Interceptor = () => {
  useEffect(() => {
    const InterceptorID = SetupInterceptor();
    return () => {
      Axios.interceptors.response.eject(InterceptorID);
    };
  }, []);

  return <></>;
};

export default Interceptor;
