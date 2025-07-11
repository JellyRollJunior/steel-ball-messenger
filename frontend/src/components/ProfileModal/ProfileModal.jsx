import styles from './ProfileModal.module.css';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const ProfileModal = () => {
  return (
    <motion.div className={styles.wrapper}>
      <div className={styles.layout}>its a profile! lolzor!</div>
    </motion.div>
  );
};

export { ProfileModal };
