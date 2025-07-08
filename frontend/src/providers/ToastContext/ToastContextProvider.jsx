import { useState } from 'react';
import { ToastContext } from './ToastContext.jsx';

const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const createToastObject = (id, content, isError) => {
    return {
      id: id,
      content: content,
      isError: isError,
    }
  }

  const createToast = (content) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [
      ...prev,
      createToastObject(id, content, false),
    ]);
  }


  return (
    <ToastContext.Provider value={{ toasts, createToast }}>
      {children}
    </ToastContext.Provider>
  )
};

export { ToastContextProvider }