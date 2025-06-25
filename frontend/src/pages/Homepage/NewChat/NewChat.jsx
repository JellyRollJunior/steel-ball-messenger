import { useUsers } from '../../../hooks/useUsers.js';
import styles from './NewChat.module.css';
import shared from '../../../styles/shared.module.css';
import steelBall from '../../../assets/images/steel-ball.png';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';

const NewChat = () => {
  const { users } = useUsers();

  const createChat = async () => {
    const token = localStorage.getItem('token');
    try {
      const data = await makeRequest(getUrl('/chats'), {
        mode: 'cors',
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          users: [{ id: 23 }],
        }),
      });
      console.log(data);
      // redirect to chats
    } catch (error) {
      console.log(error);
    }
  };

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
      <button onClick={createChat} className={shared.secondaryButton}>
        Create Chat
      </button>
    </section>
  );
};

export { NewChat };
