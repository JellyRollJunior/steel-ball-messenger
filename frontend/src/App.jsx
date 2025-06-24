import { Outlet } from 'react-router';
import { UserContextProvider } from './providers/UserContext/UserContextProvider.jsx';
import { PageContentProvider } from './providers/MainContentContext/PageContentProvider.jsx';

function App() {
  return (
    <UserContextProvider>
      <PageContentProvider>
        <Outlet />
      </PageContentProvider>
    </UserContextProvider>
  );
}

export { App };
