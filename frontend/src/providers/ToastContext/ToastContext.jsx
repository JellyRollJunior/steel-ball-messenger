import { createContext } from 'react';

const ToastContext = createContext({
  toasts: [],
  createToast: () => {},
  createErrorToast: () => {},
  deleteToast: () => {},
});

export { ToastContext };
