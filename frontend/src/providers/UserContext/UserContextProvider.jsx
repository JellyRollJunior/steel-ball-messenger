import { useState } from 'react';
import { UserContext } from './UserContext.jsx';
import { makeRequest } from '../../utils/requests.js';
import { getUrl } from '../../utils/serverUrl.js';

const UserContextProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);

  const fetchUser = async () => {
    if (bio == null || id == null || username == null) {
      const token = localStorage.getItem('token');
      const data = await makeRequest(getUrl('/current'), {
        mode: 'cors',
        method: 'GET',
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setId(data.id);
      setUsername(data.username);
      setBio(data.bio);
      return data;
    }
    return { id, username, bio };
  };

  const setUser = (id, name, bio) => {
    setId(id);
    setUsername(name);
    setBio(bio);
  };

  return (
    <UserContext.Provider value={{ id, username, bio, fetchUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };
