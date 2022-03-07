import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "regenerator-runtime";
import TokenService from "../services/TokenService";
import api from "../api";

export const PostingContext = createContext();

export const PostingContextProvider = ({ children }) => {
  const [postings, setPostings] = useState([]);
  const [error, setError] = useState(null);
  const [postingLoading, setPostingLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/" || path.includes("postings")) {
      setPostingLoading(true);
      getPostings().then((res) => {
        setPostings(res);
        setPostingLoading(false);
      });
    }
  }, []);

  const getPostings = async () => {
    const school = TokenService.getUser();
    return await api
      .post("postings", { id: school?.id })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createPosting = async (posting) => {
    const org = TokenService.getUser();
    return await api
      .post("postings/create", { org_id: org.id, posting })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updatePostingSchool = async (posting_id, status) => {
    const school = TokenService.getUser();
    return await api
      .post("postings/update", { school_id: school?.id, posting_id, status })
      .then((res) => {
        return res.data;
      })
      .then(() => {
        setPostingLoading(true);
        getPostings().then((res) => {
          setPostings(res);
          setPostingLoading(false);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const stateValues = {
    postings,
    setPostings,
    getPostings,
    createPosting,
    setPostingLoading,
    updatePostingSchool,
    postingLoading,
    error,
  };

  return (
    <PostingContext.Provider value={stateValues}>
      {children}
    </PostingContext.Provider>
  );
};
