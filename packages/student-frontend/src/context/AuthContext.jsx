import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "regenerator-runtime/runtime";
import api from "../api";
import TokenService from "../services/TokenService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path !== "/login" && path !== "/register") {
      checkLogin();
    }
  }, []);

  const checkLogin = async () => {
    setAuthLoading(true);
    const token = TokenService.getLocalAccessToken();
    if (token !== "undefined" && token !== null) {
      setCurrentUser(TokenService.getUser());
      await api.post("profile", { email: currentUser?.email }).then((res) => {
        setCurrentUser(res.data);
        TokenService.setUser(res.data);
      });
      setAuthLoading(false);
    } else {
      setAuthLoading(false);
      setCurrentUser(null);
      navigate("/login");
    }
  };

  const login = async (student) => {
    await api
      .post("login", student)
      .then((res) => {
        setError(null);
        TokenService.updateLocalAccessToken(res.data.access_token);
        TokenService.updateLocalRefreshToken(res.data.refresh_token);
        TokenService.setUser(res.data.student);
        setCurrentUser(res.data.student);
        navigate("/");
      })
      .catch((err) => setError("Incorrect Credentials"));
  };

  const register = async (student) => {
    console.log(student);
    await api
      .post("register", student)
      .then((res) => {
        setError(null);
        const student = {
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email: res.data.email,
        };
        setCurrentUser(student);
        TokenService.setUser(student);
        TokenService.updateLocalAccessToken(res.data.access_token);
        TokenService.updateLocalRefreshToken(res.data.refresh_token);
        navigate("/");
      })
      .catch((err) => setError("Email in use"));
  };

  const handleLogout = () => {
    TokenService.removeUser();
    setCurrentUser(null);
    navigate("/login");
  };

  const stateValues = {
    currentUser,
    setCurrentUser,
    checkLogin,
    setAuthLoading,
    authLoading,
    handleLogout,
    login,
    register,
    error,
  };

  return (
    <AuthContext.Provider value={stateValues}>{children}</AuthContext.Provider>
  );
};
