import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isLoggedIn }) => {
  // If the user is not logged in (token not found), redirect them to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If logged in (token found), allow access to the children component (HomePage)
  return children;
};

export default PrivateRoute;
