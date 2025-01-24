import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {
  children: React.ReactNode;
};

export const PublicRoute: React.FC<Props> = ({ children }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
