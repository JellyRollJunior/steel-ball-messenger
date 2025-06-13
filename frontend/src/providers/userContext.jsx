import { createContext, useState } from 'react';

const UserContext = createContext({
  id: null,
  username: null,
  setUser: () => {},
});

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

export { UserContext, UserContextProvider };
