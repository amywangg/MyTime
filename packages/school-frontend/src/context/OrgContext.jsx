import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "regenerator-runtime";
import { getOrg } from "../../../backend/db/queries/orgs";
import api from "../api";
import TokenService from "../services/TokenService";

export const OrgContext = createContext();

export const OrgContextProvider = ({ children }) => {
  const [orgs, setOrgs] = useState();
  const [error, setError] = useState(null);
  const [orgLoading, setOrgLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/") {
      getOrgs();
    }
  }, []);

  const getOrgs = async () => {
    setOrgLoading(true);
    await api.get("orgs", { location: currentUser?.location }).then((res) => {
      setOrgs(res.data);
    });
    setOrgLoading(false);
  };

  const getOrgById = async (id) => {
    navigate(`org/${id}`);
    setOrgLoading(true);
    await api.get("orgs", { location: currentUser?.location }).then((res) => {
      setOrgs(res.data);
    });
    setOrgLoading(false);
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
    <OrgContext.Provider value={stateValues}>{children}</OrgContext.Provider>
  );
};
