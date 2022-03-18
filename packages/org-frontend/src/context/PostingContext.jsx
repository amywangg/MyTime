import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "regenerator-runtime";
import TokenService from "../services/TokenService";
import api from "../api";

export const PostingContext = createContext();

export const PostingContextProvider = ({ children }) => {
  const [postings, setPostings] = useState([]);
  const [completePostings, setCompletePostings] = useState([]);
  const [closedPostings, setClosedPostings] = useState([]);
  const [error, setError] = useState(null);
  const [postingLoading, setPostingLoading] = useState(false);

  const getPostingsAction = () => {
    getPostings().then((res) => {
      setPostings(
        res.filter((post) => {
          return new Date(post.date) >= new Date() ? true : false;
        })
      );
      setCompletePostings(
        res.filter((post) => {
          return new Date(post.date) < new Date() && post.status !== "closed"
            ? true
            : false;
        })
      );
      setClosedPostings(res.filter((post) => post.status === "closed"));
      setPostingLoading(false);
    });
  };

  useEffect(() => {
    const path = window.location.pathname;
    if (
      path === "/" ||
      path.includes("postings") ||
      path.includes("schedule")
    ) {
      setPostingLoading(true);
      getPostingsAction();
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

  const deletePosting = async (posting_id) => {
    return await api
      .post("postings/delete", { posting_id })
      .then((res) => {
        return res.data;
      })
      .then(() => {
        setPostingLoading(true);
        getPostingsAction();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updatePosting = async (posting, updateTimeslots) => {
    return await api
      .post("postings/update", { posting, updateTimeslots })
      .then((res) => {
        return res.data;
      })
      .then(() => {
        setPostingLoading(true);
        getPostingsAction();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateStatus = async (student_job_id, status) => {
    return await api
      .post("postings/applicant/update", { student_job_id, status })
      .then((res) => {
        return res.data;
      })
      .then(() => {
        setPostingLoading(true);
        getPostingsAction();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closePosting = async (posting_id) => {
    return await api
      .post("postings/close", { posting_id })
      .then((res) => {
        return res.data;
      })
      .then(() => {
        setPostingLoading(true);
        getPostingsAction();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const stateValues = {
    closedPostings,
    postings,
    completePostings,
    deletePosting,
    setPostings,
    getPostings,
    createPosting,
    setPostingLoading,
    closePosting,
    updatePosting,
    updateStatus,
    postingLoading,
    error,
  };

  return (
    <PostingContext.Provider value={stateValues}>
      {children}
    </PostingContext.Provider>
  );
};
