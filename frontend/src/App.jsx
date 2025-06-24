import { Outlet } from 'react-router';
import { PageContentProvider } from './providers/MainContentContext/PageContentProvider.jsx';

function App() {
  return (
    <PageContentProvider>
      <Outlet />
    </PageContentProvider>
  );
}

export { App };
