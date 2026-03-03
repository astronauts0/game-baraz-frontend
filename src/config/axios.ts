import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;
const api = axios.create({ baseURL });

api.interceptors.request.use(
  (config) => {
    if (config.headers.Authorization) {
      return config;
    }
    const token = localStorage.getItem("token"); // ya Redux se
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.message
        .toLowerCase()
        .includes("invalid access to resource")
    ) {
      const requestUrl = error.config.url || "";
      const token = localStorage.getItem("token");

      // More robust check: if URL contains "login" (case insensitive), assume it's a login request
      const isLoginRequest = requestUrl.toLowerCase().includes("login");

      console.log("401 Error Intercepted:", {
        requestUrl,
        isLoginRequest,
        hasToken: !!token,
      });

      // Only reload if it's NOT a login request AND we actually had a token (session expired)
      // If we don't have a token, it's likely the initial load before auto-login, so don't reload yet.
      if (!isLoginRequest && token) {
        console.log("Token invalid, clearing and reloading...");
        localStorage.removeItem("token");
      }
    }
    return Promise.reject(error);
  },
);

export default api;
