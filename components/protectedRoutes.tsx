import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import AuthContext from "../context/user";
import Initializer from "./initializer";

const ProtectedRoute = (WrappedComponent: any) => (props: any) => {
  const { auth, initializing } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!initializing && !auth) {
      router.push("/auth");
    }
  }, [initializing, auth]);

  if (auth) return <WrappedComponent {...props} />;

  return <Initializer text="redirecting" />;
};

export default ProtectedRoute;
