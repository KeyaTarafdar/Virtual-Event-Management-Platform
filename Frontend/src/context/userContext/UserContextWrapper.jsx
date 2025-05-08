import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';

// eslint-disable-next-line react/prop-types
const UserContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [venue, setVenue] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedVenue = JSON.parse(localStorage.getItem("venue"));
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));

    if (storedUser) {
      setUser(storedUser);
    }
    if (storedVenue) {
      setVenue(storedVenue);
    }
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }
  }, []);

  return (
    <UserProvider
      value={{
        user, setUser,
        venue, setVenue,
        admin, setAdmin
      }}
    >
      {children}
    </UserProvider>
  );
};

export default UserContextWrapper
