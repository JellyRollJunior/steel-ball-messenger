import { createContext } from 'react';

const ToastContext = createContext({
  toasts: [],
  createToast: () => {},
  deleteToast: () => {},
});

export { ToastContext };
