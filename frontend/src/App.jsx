import { Outlet } from 'react-router';
import { PageContentProvider } from './providers/PageContentContext/PageContentProvider.jsx';

function App() {
  return (
    <PageContentProvider>
      <Outlet />
    </PageContentProvider>
  );
}

export { App };
