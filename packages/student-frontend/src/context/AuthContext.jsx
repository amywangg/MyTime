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
      checkLogin().then((res) => {
        setCurrentUser(res);
        TokenService.setUser(res);
        setAuthLoading(false);
      });
    }
  }, []);

  const checkLogin = async () => {
    setAuthLoading(true);
    const token = TokenService.getLocalAccessToken();
    if (token !== "undefined" && token !== null) {
      setCurrentUser(TokenService.getUser());
      return api.post("profile", { email: currentUser?.email }).then((res) => {
        return res.data;
      });
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

  const updateUser = async (student) => {
    await api
      .post("profile/update", student)
      .then((res) => {
        setError(null);
        TokenService.setUser(res.data);
        setCurrentUser(res.data);
      })
      .catch((err) => setError("Incorrect Credentials"));
  };

  const register = async (student) => {
    await api
      .post("register", student)
      .then((res) => {
        setError(null);
        const student = {
          id: res.data.id,
          middle_name: res.data.middle_name,
          student_id: res.data.student_id,
          school: res.data.school,
          school_id: res.data.school_id,
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
  const getSchools = async () => {
    setAuthLoading(true);
    return await api.get("schools").then((res) => {
      setAuthLoading(false);
      return res;
    });
  };

  const stateValues = {
    currentUser,
    setCurrentUser,
    checkLogin,
    setAuthLoading,
    updateUser,
    authLoading,
    handleLogout,
    getSchools,
    login,
    register,
    error,
  };

  return (
    <AuthContext.Provider value={stateValues}>{children}</AuthContext.Provider>
  );
};
