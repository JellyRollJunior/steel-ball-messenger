import { createBrowserRouter } from 'react-router';
import { App } from './App.jsx';
import { Signup } from './pages/Signup/Signup.jsx';
import { Login } from './pages/Login/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
