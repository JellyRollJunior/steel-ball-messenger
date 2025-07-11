import { IconButton } from '../../../components/IconButton/IconButton.jsx';
import styles from './ChatterProfile.module.css';
import profileStyles from '../Profile/Profile.module.css';
import leftArrow from '../../../assets/icons/left-arrow.svg';
import steelBall from '../../../assets/images/steel-ball.png';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';
import { handleTokenError } from '../../../utils/handleTokenError.js';
import { useNavigate } from 'react-router';

const ChatterProfile = ({ userId, back }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      try {
        const data = await makeRequest(getUrl(`/users/${userId}/profiles`), {
          mode: 'cors',
          method: 'GET',
          headers: {
            Authorizaton: `bearer ${token}`,
          },
          signal: abortController.signal,
        });
        setProfile(data);
      } catch (error) {
        handleTokenError(error, navigate);
      }
    };

    fetchUserInfo();

    return () => abortController.abort();
  }, [userId, navigate]);

  return (
    <motion.div className={styles.layout}>
      <div className={profileStyles.widget}>
        <header className={styles.header}>
          <IconButton onClick={back} icon={leftArrow} size={26} />
          <h2 className={profileStyles.title}>Username</h2>
        </header>
        <h1 className={profileStyles.username}>
          {profile && profile.name ? profile.name : 'Username'}
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
