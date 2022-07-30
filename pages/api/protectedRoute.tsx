/* eslint-disable react/display-name */

import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Initializer from "../../components/initializer";
import AuthContext from "../../context/user";

const protectedRoute = (WrappedComponent: any) => (props: any) => {
  const { auth, initializing } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!initializing && !auth) {
      router.push("/auth");
    }
  }, [initializing, auth, router]);

  if (auth) return <WrappedComponent {...props} />;

  return <Initializer text="redirecting" />;
};

export default protectedRoute;
