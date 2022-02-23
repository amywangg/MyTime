import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "regenerator-runtime";
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
      console.log(TokenService.getUser());
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

  const login = async (org) => {
    await api
      .post("login", org)
      .then((res) => {
        setError(null);
        TokenService.updateLocalAccessToken(res.data.access_token);
        TokenService.updateLocalRefreshToken(res.data.refresh_token);
        TokenService.setUser(res.data.org);
        setCurrentUser(res.data.org);
        navigate("/");
      })
      .catch((err) => setError("Incorrect Credentials"));
  };

  const register = async (org) => {
    await api
      .post("register", org)
      .then((res) => {
        setError(null);
        const org = {
          name: res.data.name,
          email: res.data.email,
        };
        console.log(res.data);
        setCurrentUser(org);
        TokenService.setUser(org);
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
