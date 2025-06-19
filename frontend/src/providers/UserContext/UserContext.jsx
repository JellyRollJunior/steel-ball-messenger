import { createContext } from 'react';

const UserContext = createContext({
  id: null,
  username: null,
  bio: null,
  setUser: () => {},
});

export { UserContext };
