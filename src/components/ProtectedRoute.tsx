import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust the path to your store

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
