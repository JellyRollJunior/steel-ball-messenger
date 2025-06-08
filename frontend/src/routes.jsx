import { createBrowserRouter } from 'react-router';
import { Homepage } from './pages/Homepage/Homepage.jsx';
import { Signup } from './pages/Signup/Signup.jsx';
import { Login } from './pages/Login/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

export { router };
