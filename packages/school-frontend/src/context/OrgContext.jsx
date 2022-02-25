import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "regenerator-runtime";
import TokenService from "../services/TokenService";
import api from "../api";

export const OrgContext = createContext();

export const OrgContextProvider = ({ children }) => {
  const [orgs, setOrgs] = useState([]);
  const [error, setError] = useState(null);
  const [orgLoading, setOrgLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/" || path.includes("org")) {
      setOrgLoading(true);
      getOrgs().then((res) => {
        setOrgs(res);
        setOrgLoading(false);
      });
    }
  }, []);

  const getOrgs = async () => {
    const school = TokenService.getUser();
    return await api
      .post("orgs", { id: school?.id })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getOrgById = async (id) => {
    navigate(`org/${id}`);
    setOrgLoading(true);
    await api.post("orgs", { location: orgs?.id }).then((res) => {
      setOrgs(res.data);
    });
    setOrgLoading(false);
  };

  const updateOrgSchool = async (org_id, status) => {
    const school = TokenService.getUser();
    return await api
      .post("orgs/update", { school_id: school?.id, org_id, status })
      .then((res) => {
        return res.data;
      })
      .then(() => {
        setOrgLoading(true);
        getOrgs().then((res) => {
          setOrgs(res);
          setOrgLoading(false);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const stateValues = {
    orgs,
    setOrgs,
    getOrgs,
    getOrgById,
    setOrgLoading,
    updateOrgSchool,
    orgLoading,
    error,
  };

  return (
    <OrgContext.Provider value={stateValues}>{children}</OrgContext.Provider>
  );
};
