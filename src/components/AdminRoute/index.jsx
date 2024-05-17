import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  if (JSON.parse(localStorage.getItem("user"))?.type !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};

export default AdminRoute;
