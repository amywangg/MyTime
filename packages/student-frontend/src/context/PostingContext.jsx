import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "regenerator-runtime";
import TokenService from "../services/TokenService";
import api from "../api";

export const PostingContext = createContext();

export const PostingContextProvider = ({ children }) => {
  const [postings, setPostings] = useState([]);
  const [completePostings, setCompletePostings] = useState([]);
  const [error, setError] = useState(null);
  const [postingLoading, setPostingLoading] = useState(false);

  useEffect(() => {
    setPostingLoading(true);
    getPostings().then((res) => {
      setPostings(
        res.filter((post) => {
          return new Date(post.date) >= new Date() ? true : false;
        })
      );
      setCompletePostings(
        res.filter((post) => {
          return new Date(post.date) < new Date() ? true : false;
        })
      );
      setPostingLoading(false);
    });
  }, []);

  const getPostings = async () => {
    const user = TokenService.getUser();
    return await api
      .post("postings", { school_id: user.school_id, id: user.id })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRecommendedPostings = async () => {
    const user = TokenService.getUser();
    return await api
      .post("postings/recommended", {
        school_id: user.school_id,
        id: user.id,
        skills: user.skills,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateSave = async (posting_id, saved) => {
    const user = TokenService.getUser();
    await api
      .post("postings/save", { posting_id, student_id: user.id, saved })
      .then((res) => {
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
  const updateStatus = async (posting_id, timeslots) => {
    const user = TokenService.getUser();
    await api
      .post("postings/update", { posting_id, student_id: user.id, timeslots })
      .then((res) => {
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

  const generatePdf = async (postings) => {
    const user = TokenService.getUser();
    console.log(postings);
    api
      .post(
        "get-pdf",
        { postings, user },
        { responseType: "arraybuffer", headers: { Accept: "application/pdf" } }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${user.first_name}-${user.last_name}-hours.pdf`
        );
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  };

  const stateValues = {
    postings,
    completePostings,
    setPostings,
    getPostings,
    getRecommendedPostings,
    setPostingLoading,
    updateSave,
    updateStatus,
    generatePdf,
    postingLoading,
    error,
  };

  return (
    <PostingContext.Provider value={stateValues}>
      {children}
    </PostingContext.Provider>
  );
};
