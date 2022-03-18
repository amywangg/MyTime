import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";
import Schedule from "../Schedule";
import Postings from "../Postings";
import Profile from "../Profile";
import SchoolProfile from "../SchoolProfile";
import { AuthContextProvider } from "../../context/AuthContext";
import TokenService from "../../services/TokenService";
import CreatePostings from "../CreatePostings";
import { PostingContextProvider } from "../../context/PostingContext";
import { SchoolContextProvider } from "../../context/SchoolContext";
import Posting from "../Posting/Posting";
import EditPosting from "../EditPosting";
import PendingPosting from "../PendingPosting/PendingPosting";
import ClosedPosting from "../ClosedPosting/ClosedPosting";

function PrivateOutlet({ Component }) {
  const currentUser = TokenService.getUser();
  return currentUser !== null ? Component : <Navigate to="/login" />;
}

export function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<PrivateOutlet Component={<Dashboard />} />} />
        <Route
          path="/school/:id"
          element={
            <PrivateOutlet
              Component={
                <SchoolContextProvider>
                  <SchoolProfile />
                </SchoolContextProvider>
              }
            />
          }
        />
        <Route
          path="/postings"
          element={
            <PrivateOutlet
              Component={
                <PostingContextProvider>
                  <Postings />
                </PostingContextProvider>
              }
            />
          }
        />
        <Route
          path="/postings/:id"
          element={
            <PrivateOutlet
              Component={
                <PostingContextProvider>
                  <Posting />
                </PostingContextProvider>
              }
            />
          }
        />
        <Route
          path="/postings/pending/:id"
          element={
            <PrivateOutlet
              Component={
                <PostingContextProvider>
                  <PendingPosting />
                </PostingContextProvider>
              }
            />
          }
        />
        <Route
          path="/postings/closed/:id"
          element={
            <PrivateOutlet
              Component={
                <PostingContextProvider>
                  <ClosedPosting />
                </PostingContextProvider>
              }
            />
          }
        />
        <Route
          path="/postings/:id/edit"
          element={
            <PrivateOutlet
              Component={
                <PostingContextProvider>
                  <EditPosting />
                </PostingContextProvider>
              }
            />
          }
        />
        <Route
          path="/postings/create"
          element={
            <PrivateOutlet
              Component={
                <PostingContextProvider>
                  <CreatePostings />
                </PostingContextProvider>
              }
            />
          }
        />
        <Route
          path="/profile"
          element={<PrivateOutlet Component={<Profile />} />}
        />
        <Route
          path="/schedule"
          element={
            <PrivateOutlet
              Component={
                <PostingContextProvider>
                  <Schedule />
                </PostingContextProvider>
              }
            />
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </AuthContextProvider>
  );
}

App.propTypes = {};

export default App;
