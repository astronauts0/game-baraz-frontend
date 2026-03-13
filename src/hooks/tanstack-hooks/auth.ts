import { login, register } from "@/api/auth";
import { useApiMutation } from ".";

export const useLogin = () => {
  return useApiMutation(login, "Login successful", "Failed to login", [], {
    onSuccess: (data: any) => {
      const { accessToken, refreshToken } = data.data;
      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
    },
  });
};

export const useRegister = () => {
  return useApiMutation(register);
};
