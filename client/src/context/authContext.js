import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [authToken]);

  const register = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", formData);
      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false);
      setAuthError(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const login = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", formData);
      setAuthToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false);
      setAuthError(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ authToken, register, login, logout, loading, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
