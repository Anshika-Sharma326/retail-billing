import React, { createContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ==========================
  // LOGIN
  // ==========================

  const login = async (username, password) => {

    try {

      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const loginData = response.data;

      if (loginData.message === "Login Successful") {

        setUser(loginData);

        localStorage.setItem("user", JSON.stringify(loginData));
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("role", loginData.role);
        localStorage.setItem("fullName", loginData.fullName);

        return loginData;
      }

      return null;

    } catch (error) {

      console.error("Login Error:", error);

      return null;
    }
  };

  // ==========================
  // LOGOUT
  // ==========================

  const logout = () => {

    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("fullName");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;