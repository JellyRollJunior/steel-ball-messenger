import { useState } from 'react';
import { ToastContext } from './ToastContext.jsx';

const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToastToList = (content, isError) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [
      ...prev,
      {
        id: id,
        content: content,
        isError: isError,
      },
    ]);

    return id;
  };

  const createToast = async (content, isError = false) => {
    const id = addToastToList(content, isError);

    // persist for 2s
    await new Promise((resolve) => setTimeout(resolve, 2000));
    deleteToast(id);
  };

  const deleteToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id != id));
  };

  return (
    <ToastContext.Provider
      value={{ toasts, createToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContextProvider };
