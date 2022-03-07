import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "regenerator-runtime";
import api from "../api";
import TokenService from "../services/TokenService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path !== "/login" && path !== "/register") {
      checkLogin().then((res) => {
        setCurrentUser(res.data);
        TokenService.setUser(res.data);
        setAuthLoading(false);
      });
    }
  }, []);

  const checkLogin = async () => {
    setAuthLoading(true);
    const token = TokenService.getLocalAccessToken();
    if (token !== "undefined" && token !== null) {
      setCurrentUser(TokenService.getUser());
      return await api
        .post("profile", { email: currentUser?.email })
        .then((res) => {
          return res;
        });
    } else {
      setAuthLoading(false);
      setCurrentUser(null);
      navigate("/login");
    }
  };

  const login = async (org) => {
    setAuthLoading(true);
    await api
      .post("login", org)
      .then((res) => {
        setError(null);
        TokenService.updateLocalAccessToken(res.data.access_token);
        TokenService.updateLocalRefreshToken(res.data.refresh_token);
        TokenService.setUser(res.data.org);
        setCurrentUser(res.data.org);
        navigate("/");
        setAuthLoading(false);
      })
      .catch((err) => setError("Incorrect Credentials"));
  };

  const register = async (org) => {
    await api
      .post("register", org)
      .then((res) => {
        setError(null);
        TokenService.setUser(res.data.org);
        setCurrentUser(res.data.org);
        TokenService.updateLocalAccessToken(res.data.access_token);
        TokenService.updateLocalRefreshToken(res.data.refresh_token);
        navigate("/");
      })
      .catch((err) => setError("Email in use"));
  };
  const updateProfile = async (org) => {
    await api
      .post("profile/update", org)
      .then((res) => {
        setAuthLoading(true);
        setError(null);
        TokenService.setUser(res.data);
        setCurrentUser(res.data);
        navigate("/");
        setAuthLoading(false);
      })
      .catch((err) => setError("Invalid Fields"));
  };
  const handleLogout = () => {
    TokenService.removeUser();
    setCurrentUser(null);
    navigate("/login");
  };

  const stateValues = {
    currentUser,
    updateProfile,
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
