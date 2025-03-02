import React from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth";

export const PrivateRoute = ({ children }) => {
  const { token } = React.useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

export const AdminRoute = ({ children }) => {
  const { token, role } = React.useContext(AuthContext);
  return token && role === "admin" ? children : <Navigate to="/login" />;
};