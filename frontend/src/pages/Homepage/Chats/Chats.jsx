import { useContext } from 'react';
import { UserContext } from '../../../providers/UserContext/UserContext.jsx';
import { useChats } from '../../../hooks/useChats.js';
import { IconButton } from '../../../components/IconButton/IconButton.jsx';
import shared from '../../../styles/shared.module.css';
import styles from './Chats.module.css';
import createChatIcon from '../../../assets/icons/new-chat.svg';
import steelBall from '../../../assets/images/steel-ball.png';

const Chats = ({ setChatId }) => {
  const { chats, loading, error } = useChats();
  const { username } = useContext(UserContext);

  return (
    <section className={`${styles.pageLayout} ${shared.background}`}>
      <header className={`${styles.header} ${shared.card}`}>
        <h1 className={`${styles.title} ${shared.card}`}>
          {username ? username : 'Username'}
        </h1>
        <IconButton icon={createChatIcon} alt="create chat icon" />
      </header>
      {error && <h2>{error}</h2>}
      {loading && <h2>loading chats</h2>}

      {chats && (
        <ul className={`${styles.chatsWrapper} ${shared.marginTopLarge}`}>
          {chats.map((chat) => (
            <li key={chat.id} className={`${shared.card}`}>
              <button
                className={styles.chatItem}
                onClick={() => setChatId(chat.id)}
              >
                <img src={steelBall} alt="" className={styles.profilePicture} />
                <h3 className={styles.chatUsernames}>
                  {chat.users.map((user) => user.username).join(', ')}
                </h3>
                <p className={styles.latestMessage}>
                  {chat.latestMessage
                    ? chat.latestMessage.content
                    : 'Click to send a message'}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export { Chats };
