import { createContext } from 'react';

const ToastContext = createContext({
  toasts: [],
  createToast: () => {},
  createToastError: () => {},
  deleteToast: () => {},
});

export { ToastContext };
