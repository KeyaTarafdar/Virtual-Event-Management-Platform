import { createContext, useContext } from "react";

export const UserContext = createContext({
  user: {},
  setUser: () => {},
  venue: {},
  setVenue: () => {},
  admin: {},
  setAdmin: () => {},
});

export const UserProvider = UserContext.Provider;

export const useUser = () => {
  return useContext(UserContext);
};
