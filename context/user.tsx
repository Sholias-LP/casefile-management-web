import { Constants } from "../utils/constants";
import { SecureStorage } from "../utils/storage";
import React, { createContext, FC, useEffect, useState } from "react";
import { IUser } from "../interfaces/user";

const secureStorage = new SecureStorage();
interface IAuthContext {
  auth?: string;
  setAuthAndCache: (v?: string) => void;
  currentUser: IUser;
  updateCurrentUser: (value?: IUser) => void;
  setLogout: (route?: string) => void;
  initializing: boolean;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);
export const AuthProvider = AuthContext.Provider;

export const setLogout = (route?: string) => {
  secureStorage.removeItem(Constants.token);
  secureStorage.removeItem(Constants.currentUser);
  window.location.href = route ?? "/";
};

export function useAuth() {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return auth;
}

interface Props {
  children?: JSX.Element[] | JSX.Element;
}

export const AuthProviderContainer: FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<string>();
  const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    let storedUser = secureStorage.getItem(Constants.currentUser);
    if (typeof storedUser === "string") setCurrentUser(JSON.parse(storedUser));
  }, []);

  const updateCurrentUser = (value?: IUser | undefined) => {
    if (value) {
      secureStorage.storeItem(Constants.currentUser, JSON.stringify(value));
      setCurrentUser(value);
      return;
    }
    setCurrentUser({} as IUser);
  };

  const setAuthAndCache = (value?: string | undefined) => {
    if (value) {
      secureStorage.storeItem(Constants.token, value);
      setAuth(value);
      return;
    }
    setAuth(undefined);
  };

  useEffect(() => {
    const token = secureStorage.getItem(Constants.token);
    const currentUser = secureStorage.getItem(Constants.currentUser);
    if (token) setAuthAndCache(token);
    if (currentUser) updateCurrentUser(JSON.parse(currentUser));
    setInitializing(false);
  }, []);

  return (
    <AuthProvider
      value={{
        auth,
        setAuthAndCache,
        setLogout,
        currentUser,
        updateCurrentUser,
        initializing,
      }}
    >
      {children}
    </AuthProvider>
  );
};
export default AuthContext;
