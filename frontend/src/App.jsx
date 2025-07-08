import { Outlet } from 'react-router';
import { ToastContextProvider } from './providers/ToastContext/ToastContextProvider.jsx';
import { PageContentProvider } from './providers/PageContentContext/PageContentProvider.jsx';

function App() {
  return (
    <ToastContextProvider>
      <PageContentProvider>
        <Outlet />
      </PageContentProvider>
    </ToastContextProvider>
  );
}

export { App };
