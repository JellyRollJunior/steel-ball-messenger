import { createBrowserRouter } from 'react-router';
import { App } from './App.jsx';
import { Signup } from './pages/Signup/Signup.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

export { router };
