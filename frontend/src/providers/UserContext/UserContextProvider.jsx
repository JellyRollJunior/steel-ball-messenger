import { useState } from 'react';
import { UserContext } from './UserContext.jsx';

const UserContextProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);

  const setUser = (id, name, bio) => {
    setId(id);
    setUsername(name);
    setBio(bio);
  };

  return (
    <UserContext.Provider value={{ id, username, bio, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };
