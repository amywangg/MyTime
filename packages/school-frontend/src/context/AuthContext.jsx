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

  const updateProfile = async (school) => {
    await api
      .post("profile/update", school)
      .then((res) => {
        setAuthLoading(true);
        TokenService.setUser(res.data);
        setCurrentUser(res.data);
        setAuthLoading(false);
      })
      .catch((err) => setError("Invalid Fields"));
  };

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

  const login = async (school) => {
    await api
      .post("login", school)
      .then((res) => {
        setError(null);
        TokenService.updateLocalAccessToken(res.data.access_token);
        TokenService.updateLocalRefreshToken(res.data.refresh_token);
        TokenService.setUser(res.data.school);
        setCurrentUser(res.data.school);
        navigate("/");
      })
      .catch((err) => setError("Incorrect Credentials"));
  };

  const register = async (school) => {
    await api
      .post("register", school)
      .then((res) => {
        setError(null);
        const school = {
          id: res.data.id,
          location: res.data.location,
          description: res.data.description,
          image: res.data.image,
          name: res.data.name,
          email: res.data.email,
        };
        setCurrentUser(school);
        TokenService.setUser(school);
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
    updateProfile,
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
