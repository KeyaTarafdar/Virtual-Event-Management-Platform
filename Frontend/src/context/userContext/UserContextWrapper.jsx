import { useState, useEffect } from "react";
import { UserProvider } from "./UserContext";

// eslint-disable-next-line react/prop-types
const UserContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [venue, setVenue] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const storedVenue = JSON.parse(sessionStorage.getItem("venue"));
    const storedAdmin = JSON.parse(sessionStorage.getItem("admin"));

    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
    if (storedVenue) {
      setVenue(storedVenue);
    } else {
      setVenue(null);
    }
    if (storedAdmin) {
      setAdmin(storedAdmin);
    } else {
      setAdmin(null);
    }
  }, []);

  return (
    <UserProvider
      value={{
        user,
        setUser,
        venue,
        setVenue,
        admin,
        setAdmin,
      }}
    >
      {children}
    </UserProvider>
  );
};

export default UserContextWrapper;
