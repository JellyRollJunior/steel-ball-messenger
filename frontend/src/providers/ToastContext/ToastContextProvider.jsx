import { useState } from 'react';
import { ToastContext } from './ToastContext.jsx';

const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const createToastObject = (id, content, isError) => {
    return {
      id: id,
      content: content,
      isError: isError,
    };
  };

  const createToast = async (content) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, createToastObject(id, content, false)]);

    // persist for 2s
    await new Promise((resolve) => setTimeout(resolve, 2000));
    deleteToast(id);
  };

  const deleteToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id != id));
  };

  return (
    <ToastContext.Provider value={{ toasts, createToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContextProvider };
