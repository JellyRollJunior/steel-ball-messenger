import { createContext } from 'react';

const UserContext = createContext({
  id: null,
  username: null,
  setUser: () => {},
});

export { UserContext };
