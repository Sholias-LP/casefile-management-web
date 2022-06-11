import { Constants } from "./constants";

export class SecureStorage {
  storeItem = (key: string, value: string) => localStorage.setItem(key, value);
  getItem = (key: string) =>
    typeof window !== "undefined" ? localStorage.getItem(key) : "";
  removeItem = (key: string) => localStorage.removeItem(key);
  clearAll = () => localStorage.clear();
}

export const getDefaultAuth = () => {
  const secureStorage = new SecureStorage();
  try {
    const token = secureStorage.getItem(Constants.token);
    return token;
  } catch (e) {
    return null;
  }
};
