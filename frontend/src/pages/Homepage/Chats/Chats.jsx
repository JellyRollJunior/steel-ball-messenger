import { useContext } from 'react';
import { useChats } from '../../../hooks/useChats.js';
import shared from '../../../styles/shared.module.css';
import styles from './Chats.module.css';
import createChatIcon from '../../../assets/icons/new-chat.svg';
import { UserContext } from '../../../providers/UserContext/UserContext.jsx';

const Chats = ({ setChatId }) => {
  const { chats, loading, error } = useChats();
  const { username } = useContext(UserContext);

  return (
    <section className={`${styles.pageLayout} ${shared.background}`}>
      <header className={`${styles.header} ${shared.card}`}>
        <h1 className={`${styles.title} ${shared.card}`}>
          {username ? username : 'Username'}
        </h1>
        <button className={`${styles.createChatBtn} ${styles.iconButton}`}>
          <img src={createChatIcon} alt="" />
        </button>
      </header>
      {error && <h2>{error}</h2>}
      {loading && <h2>loading chats</h2>}
      {chats && (
        <ul>
          {chats.map((chat) => (
            <li key={chat.id} className={shared.card}>
              <div>{chat.id}</div>
              <button onClick={() => setChatId(chat.id)}>Show messages</button>
              {chat.users.map((user) => (
                <div key={user.id}>{user.username}</div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export { Chats };
