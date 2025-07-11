import styles from './ProfileModal.module.css';
import steelBall from '../../assets/images/steel-ball.png';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const ProfileModal = ({ userId }) => {
  return (
    <motion.div className={styles.wrapper}>
      <div className={styles.layout}>
        <h2 className={styles.title}>Username</h2>
        <h1>Test</h1>
        <h2 className={styles.title}>Bio</h2>
        <p>I am a bio!</p>
        <h2 className={styles.title}>Icon</h2>
        <img className={styles.profileImg} src={steelBall} alt="" />
      </div>
    </motion.div>
  );
};

export { ProfileModal };
