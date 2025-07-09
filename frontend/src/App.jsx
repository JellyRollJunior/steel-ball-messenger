import { Outlet } from 'react-router';
import { ToastContextProvider } from './providers/ToastContext/ToastContextProvider.jsx';
import { PageContentProvider } from './providers/PageContentContext/PageContentProvider.jsx';
import { Toaster } from './components/Toaster/Toaster.jsx';

function App() {
  return (
    <ToastContextProvider>
      <PageContentProvider>
        <Toaster />
        <Outlet />
      </PageContentProvider>
    </ToastContextProvider>
  );
}

export { App };
