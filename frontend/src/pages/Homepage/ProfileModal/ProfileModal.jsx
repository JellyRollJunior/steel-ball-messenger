import styles from './ProfileModal.module.css';
import profileStyles from '../Profile/Profile.module.css';
import steelBall from '../../../assets/images/steel-ball.png';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const ProfileModal = ({ userId }) => {
  return (
    <motion.div className={styles.layout}>
      <div className={profileStyles.widget}>
        <h2 className={profileStyles.title}>Username</h2>
        <h1 className={profileStyles.username}>Test</h1>
      </div>
      <div className={profileStyles.widget}>
        <h2 className={profileStyles.title}>Bio</h2>
        <p className={styles.bioContent}>I am a bio!</p>
      </div>
      <div className={profileStyles.widget}>
        <h2 className={profileStyles.title}>Icon</h2>
        <img className={profileStyles.profileImg} src={steelBall} alt="" />
      </div>
    </motion.div>
  );
};

export { ProfileModal };
