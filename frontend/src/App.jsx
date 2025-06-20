import { Outlet } from 'react-router';
import { UserContextProvider } from './providers/UserContext/UserContextProvider.jsx';

function App() {
  return (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
  );
}

export { App };
