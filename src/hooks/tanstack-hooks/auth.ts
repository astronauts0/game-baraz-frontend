import { getUser, login } from "@/api/auth";
import { useApiMutation, useApiQuery } from ".";

export const useUser = () => {
  return useApiQuery(["user"], getUser, (response) => response.data);
};

export const useLogin = () => {
  return useApiMutation(
    login,
    "Login successful",
    "Failed to login",
    [["user"]],
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
      },
    },
  );
};
