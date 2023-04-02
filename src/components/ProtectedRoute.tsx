import React from "react";
import jwt_decode from "jwt-decode";
import NotFoundPage from "../pages/notfound";

type TProps = {
  authSecure?: boolean;
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<TProps> = ({ authSecure, children }) => {
  const token = localStorage.getItem("token");

  // @ts-ignore
  // let userRole = "admin"
  const userRole = token ? jwt_decode(token).roles : null;

  if (authSecure) {
    return token ? <NotFoundPage /> : <div>{children}</div>;
  } else {
    if (userRole !== "admin") {
      return <NotFoundPage />;
    } else {
      return <div>{children}</div>;
    }
  }
};

export default ProtectedRoute;
