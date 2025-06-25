import { useUsers } from '../../../hooks/useUsers.js';
import styles from './NewChat.module.css';
import shared from '../../../styles/shared.module.css';
import steelBall from '../../../assets/images/steel-ball.png';

const NewChat = () => {
  const { users } = useUsers();

  return (
    <section className={styles.pageLayout}>
      <header className={`${styles.header} ${shared.card}`}>
        <h1 className={`${styles.title}`}>New Chat</h1>
      </header>
      <h2 className={`${styles.sectionTitle} ${shared.card}`}>Users</h2>
      <ul className={`${styles.chatsWrapper} ${shared.marginTopSmall}`}>
        {users &&
          users.map((user) => (
            <li key={user.id} className={`${styles.chatCard} ${shared.card}`}>
              <button className={styles.chatItem}>
                <img src={steelBall} alt="" className={styles.profilePicture} />
                <p className={styles.chatUsernames}>{user.username}</p>
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
};

export { NewChat };
