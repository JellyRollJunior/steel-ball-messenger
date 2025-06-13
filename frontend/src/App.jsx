import { Outlet } from 'react-router';
import { UserContextProvider } from './providers/UserContext/UserContextProvide.jsx';

function App() {
  return (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
  );
}

export { App };
