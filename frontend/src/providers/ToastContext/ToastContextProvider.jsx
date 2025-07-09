import { useEffect, useState } from 'react';
import { ToastContext } from './ToastContext.jsx';

const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    createToast('hello')
    createErrorToast('error hello')
  }, [])

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

  const createToast = async (content) => {
    const id = addToastToList(content, false);

    // persist for 2s
    await new Promise((resolve) => setTimeout(resolve, 2000));
    deleteToast(id);
  };

  const createErrorToast = async (content) => {
    addToastToList(content, true);
  };

  const deleteToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id != id));
  };

  return (
    <ToastContext.Provider
      value={{ toasts, createToast, createErrorToast, deleteToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContextProvider };
