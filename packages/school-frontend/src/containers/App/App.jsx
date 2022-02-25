import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";
import Profile from "../Profile";
import { AuthContextProvider } from "../../context/AuthContext";
import { OrgContextProvider } from "../../context/OrgContext";
import TokenService from "../../services/TokenService";

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
                <OrgContextProvider>
                  <Dashboard />
                </OrgContextProvider>
              }
            />
          }
        />

        <Route
          path="/profile"
          element={<PrivateOutlet Component={<Profile />} />}
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </AuthContextProvider>
  );
}

App.propTypes = {};

export default App;
