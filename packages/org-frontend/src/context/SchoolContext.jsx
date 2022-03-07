import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "regenerator-runtime";
import TokenService from "../services/TokenService";
import api from "../api";
import { AuthContext } from "./AuthContext";

export const SchoolContext = createContext();

export const SchoolContextProvider = ({ children }) => {
  const [schools, setSchools] = useState(null);
  const [error, setError] = useState(null);
  const [schoolLoading, setSchoolLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/" || path.includes("school")) {
      console.log(currentUser);
      if (currentUser !== undefined) {
        setSchoolLoading(true);
        getSchools().then((res) => {
          setSchools(res);
          setSchoolLoading(false);
        });
      }
    }
  }, [currentUser]);

  const getSchools = async () => {
    return await api
      .post("schools", { id: currentUser.id })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const stateValues = {
    schools,
    setSchools,
    getSchools,
    schoolLoading,
    schoolLoading,
    error,
  };

  return (
    <SchoolContext.Provider value={stateValues}>
      {children}
    </SchoolContext.Provider>
  );
};
