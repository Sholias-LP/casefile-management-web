import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import AuthContext from "../context/user";
import Initializer from "./initializer";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const ProtectedRoute: FC<IProps> = ({ children }) => {
  const { auth, initializing } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!initializing && !auth) {
      router.push("/auth");
    }
  }, [initializing, auth]);

  if (initializing) {
    return <Initializer />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
