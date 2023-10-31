import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../state/atoms/userState";

const ProtectedRoute = () => {
  const user = useRecoilValue(userState);

  if (!user) {
    return <Navigate to="/" />;
  }

  // If the user is signed in, render the protected component
  return <Outlet />;
};

export default ProtectedRoute;
