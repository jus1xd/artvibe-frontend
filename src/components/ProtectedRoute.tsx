import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import NotFoundPage from "../pages/notfound";
import { userApi } from "../store/services/userService";

type TProps = {
  notAuthSecure?: boolean;
  authSecure?: boolean;
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<TProps> = ({
  notAuthSecure,
  authSecure,
  children,
}) => {
  const [userRole, setUserRole] = useState<string>("");

  // получить токен из localStorage
  const token = localStorage.getItem("token");

  // @ts-ignore
  const userId = token ? jwt_decode(token).id : null;
  // @ts-ignore xd
  const roleDlyaUmnika = token ? jwt_decode(token).roles : null;

  let data: any;

  // получить user'а из db
  if (userId) {
    data = userApi.useGetUserByIdQuery(userId).data;
  }

  useEffect(() => {
    if (data) {
      if (data._id !== userId) {
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        setUserRole(data.role);
      }
    }
  }, [data]);

  if (notAuthSecure) {
    return token ? <div>{children}</div> : <NotFoundPage />;
  } else if (authSecure) {
    return token ? <NotFoundPage /> : <div>{children}</div>;
  } else {
    if (roleDlyaUmnika === "admin" && userRole !== "admin") {
      return <NotFoundPage text={"Не трогай токен дебил (xD)"} />;
    } else if (userRole !== "admin") {
      return <NotFoundPage />;
    } else {
      return <div>{children}</div>;
    }
  }
};

export default ProtectedRoute;
