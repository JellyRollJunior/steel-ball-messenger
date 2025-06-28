import { useState } from 'react';
import { usePageContentContext } from '../../../hooks/usePageContentContext.js';
import { pages } from '../pages.js';
import { useUsers } from '../../../hooks/useUsers.js';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';
import { LoadingElement } from '../../../components/LoadingElement/LoadingElement.jsx';
import styles from './NewChat.module.css';
import shared from '../../../styles/shared.module.css';
import steelBall from '../../../assets/images/steel-ball.png';

const NewChat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const { users, isLoading } = useUsers();
  const { setPageContent } = usePageContentContext();

  const createChat = async () => {
    if (!selectedUser) return;
    const token = localStorage.getItem('token');
    try {
      setIsDisabled(true);
      await makeRequest(getUrl('/chats'), {
        mode: 'cors',
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          users: [{id: selectedUser}],
        }),
      });
      // redirect to chats page
      setPageContent(pages.CHATS)
    } catch (error) {
      console.log(error);
      // error notification
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <section className={styles.pageLayout}>
      <header className={`${styles.header}`}>
        <h1 className={`${shared.title}`}>New Chat</h1>
      </header>
      <h2 className={`${styles.sectionTitle}`}>Users</h2>
      {isLoading && (
        <div className={`${styles.loadingWrapper} ${shared.marginTopSmall}`}>
          <LoadingElement isVisible={isLoading} isAnimating={isLoading} style={{maxWidth: 150}} />
          <h2>Loading...</h2>
        </div>
      )}
      {users && (
        <>
          <ul className={styles.usersWrapper}>
            {users.map((user) => (
              <li key={user.id} className={`${shared.vertContainerItem}`}>
                <label className={styles.userItem} htmlFor={user.id}>
                  <img src={steelBall} alt="" className={styles.profilePicture} />
                  <p className={styles.username}>{user.username}</p>
                  <input type="radio" name="user" id={user.id} onClick={() => setSelectedUser(user.id)} />
                </label>
              </li>
            ))}
          </ul>
          <button onClick={createChat} className={styles.valentineButton} disabled={isDisabled}>
            Create Chat
          </button>
        </>
      )}
    </section>
  );
};

export { NewChat };
