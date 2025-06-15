import { useState } from 'react';
import { UserContext } from './UserContext.jsx';

const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const setUser = (id, name) => {
    setUserId(id);
    setUsername(name);
  };

  return (
    <UserContext.Provider value={{ id: userId, username, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };
