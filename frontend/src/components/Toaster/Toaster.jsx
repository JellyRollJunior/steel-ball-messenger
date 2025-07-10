import { useContext } from 'react';
import { ToastContext } from '../../providers/ToastContext/ToastContext.jsx';
import styles from './Toaster.module.css';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'motion/react';

const Toaster = () => {
  const { toasts } = useContext(ToastContext);

  return (
    <ul className={styles.toaster}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.li
            key={toast.id}
            className={`${toast.isError ? styles.errorToast : styles.toast}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {toast.content}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export { Toaster };
