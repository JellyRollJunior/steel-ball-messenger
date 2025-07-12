import { useContext, useEffect } from 'react';
import { ToastContext } from '../../../providers/ToastContext/ToastContext.jsx';
import { useChatterProfile } from '../../../hooks/useChatterProfile.js';
import { IconButton } from '../../../components/IconButton/IconButton.jsx';
import styles from './ChatterProfile.module.css';
import profileStyles from '../Profile/Profile.module.css';
import leftArrow from '../../../assets/icons/left-arrow.svg';
import steelBall from '../../../assets/images/steel-ball.png';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const ChatterProfile = ({ userId, renderMessages }) => {
  const { createToast } = useContext(ToastContext);
  const { profile, error } = useChatterProfile(userId);

  useEffect(() => {
    if (error) {
      createToast('Unable to fetch user profile');
    }
  }, [error, createToast]);

  return (
    <motion.div className={styles.layout} initial={{ x: 100 }} animate={{ x: 0}}>
      <div className={profileStyles.widget}>
        <header className={styles.header}>
          <IconButton onClick={renderMessages} icon={leftArrow} size={26} />
          <h2 className={profileStyles.title}>Username</h2>
        </header>
        <h1 className={profileStyles.username}>
          {profile && profile.username ? profile.username : 'Username'}
        </h1>
      </div>
      <div className={profileStyles.widget}>
        <h2 className={profileStyles.title}>Bio</h2>
        <p className={styles.bioContent}>
          {profile && profile.bio ? profile.bio : 'Profile is unavailable'}
        </p>
      </div>
      <div className={profileStyles.widget}>
        <h2 className={profileStyles.title}>Icon</h2>
        <img className={profileStyles.profileImg} src={steelBall} alt="" />
      </div>
    </motion.div>
  );
};

export { ChatterProfile };
