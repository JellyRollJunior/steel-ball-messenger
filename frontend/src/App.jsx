import { Outlet } from 'react-router';
import { UserContextProvider } from './providers/userContext.jsx';

function App() {
  return (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
  );
}

export { App };
