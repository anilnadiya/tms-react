import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Authorized() {
  const isAuthenticated = localStorage.getItem('isAuthnticated')

  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
}

export default Authorized;
