import { useQuery, useMutation } from "react-query";
import Ax from "../utils/Axios";

const fetchUser = async () => {
  return await Ax.get("whoami");
};

const loginUser = async (body) => {
  return await Ax.post("auth", body);
};

const registerUser = async (body) => {
  return await Ax.post("register", body);
};

const logoutUser = async () => {
  return await Ax.post("logout");
};

const userUpdate = async (body) => {
  return await Ax.patch("me", body);
};

const userUpdatePassword = async (body) => {
  return await Ax.patch("me/pw", body);
};

const userDelete = async () => {
  return await Ax.delete("me");
};

const useUser = () =>
  useQuery("user", fetchUser, {
    refetchOnWindowFocus: false,
    retry: false,
  });

const useLoginUser = () => useMutation("loginUser", loginUser);
const useLogoutUser = () => useMutation("logoutUser", logoutUser);
const useRegisterUser = () => useMutation("registerUser", registerUser);
const useUserUpdate = () => useMutation("updateUser", userUpdate);
const useUserUpdatePassword = () =>
  useMutation("updateUserPassword", userUpdatePassword);
const useUserDelete = () => useMutation("deleteUser", userDelete);

export {
  useUser,
  useLoginUser,
  useRegisterUser,
  useLogoutUser,
  useUserUpdate,
  useUserUpdatePassword,
  useUserDelete,
};
