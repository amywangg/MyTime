import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";
import Applications from "../Applications";
import Schedule from "../Schedule";
import Browse from "../Browse";
import Profile from "../Profile";
import { AuthContextProvider } from "../../context/AuthContext";
import TokenService from "../../services/TokenService";
import { PostingContextProvider } from "../../context/PostingContext";
import Posting from "../Posting";
import Search from "../Search/Search";

function PrivateOutlet({ Component }) {
  const currentUser = TokenService.getUser();
  return currentUser !== null ? Component : <Navigate to="/login" />;
}

export function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateOutlet
              Component={
                <PostingContextProvider>
                  <Dashboard />
                </PostingContextProvider>
              }
            />
          }
        />
        <Route
          path="/applications"
          element={
            <PrivateOutlet
              Component={
                <PostingContextProvider>
                  <Applications />
                </PostingContextProvider>
              }
            />
          }
        />
        <Route
          path="/browse"
          element={
            <PrivateOutlet
              Component={
                <PostingContextProvider>
                  <Browse />
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
        <Route
          path="browse/postings/:id"
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
          path="postings/complete/:id"
          element={
            <PrivateOutlet
              Component={
                <PostingContextProvider>
                  <Posting complete={true} />
                </PostingContextProvider>
              }
            />
          }
        />
        <Route
          path="browse/search/:params"
          element={
            <PrivateOutlet
              Component={
                <PostingContextProvider>
                  <Search />
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
