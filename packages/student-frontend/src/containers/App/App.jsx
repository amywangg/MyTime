import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home";
import Login from "../Login";
import Register from "../Register";
import Applications from "../Applications";
import Schedule from "../Schedule";
import Browse from "../Browse";
import Profile from "../Profile";
import { AuthContext, AuthContextProvider } from "../../context/AuthContext";
import TokenService from "../../services/TokenService";

function PrivateOutlet({ Component }) {
  const currentUser = TokenService.getUser();
  return currentUser !== null ? Component : <Navigate to="/login" />;
}

export function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<PrivateOutlet Component={<Home />} />} />
        <Route
          path="/applications"
          element={<PrivateOutlet Component={<Applications />} />}
        />
        <Route
          path="/browse"
          element={<PrivateOutlet Component={<Browse />} />}
        />
        <Route
          path="/profile"
          element={<PrivateOutlet Component={<Profile />} />}
        />
        <Route
          path="/schedule"
          element={<PrivateOutlet Component={<Schedule />} />}
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </AuthContextProvider>
  );
}

App.propTypes = {};

export default App;
