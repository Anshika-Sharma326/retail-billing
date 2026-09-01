import axios from "axios";

const api = axios.create({
  baseURL: "https://retail-billing-4.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {

    // Login/Register request me token mat bhejo
    if (
      config.url === "/auth/login" ||
      config.url === "/auth/register"
    ) {
      return config;
    }

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;