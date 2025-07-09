import { useContext } from 'react';
import styles from './Toaster.module.css';
import { ToastContext } from '../../providers/ToastContext/ToastContext.jsx';

const Toaster = () => {
  const { toasts } = useContext(ToastContext);

  return (
    <ul className={styles.toaster}>
      {toasts.map((toast) => (
        <li
          key={toast.id}
          className={`${toast.isError ? styles.errorToast : styles.toast}`}
        >
          {toast.content}
        </li>
      ))}
    </ul>
  );
};

export { Toaster };
