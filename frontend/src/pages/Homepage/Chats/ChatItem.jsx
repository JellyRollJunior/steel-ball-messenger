import steelBall from '../../../assets/images/steel-ball.png';
import styles from './ChatItem.module.css';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const ChatItem = ({ usernames, latestMessage, onClick }) => {
  return (
    <motion.li
      className={styles.chatItemWrapper}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <button className={styles.chatItem} onClick={onClick}>
        <img
          src={steelBall}
          alt="Profile picture"
          className={styles.profilePicture}
        />
        <h3 className={styles.chatUsernames}>{usernames}</h3>
        <p className={styles.latestMessage}>
          {latestMessage ? latestMessage : 'Send a message'}
        </p>
      </button>
    </motion.li>
  );
};

export { ChatItem };
