import steelBall from '../../../assets/images/steel-ball.png';
import styles from './Chats.module.css';

const ChatItem = ({ usernames, latestMessage, onClick }) => {
  return (
    <li className={styles.chatItemWrapper}>
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
    </li>
  );
};

export { ChatItem };
