import { useEffect, useState } from 'react';
import { usePageContentContext } from '../../../hooks/usePageContentContext.js';
import { pages } from '../pages.js';
import { useUsers } from '../../../hooks/useUsers.js';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';
import { LoadingElement } from '../../../components/LoadingElement/LoadingElement.jsx';
import { TextInput } from '../../../components/TextInput/TextInput.jsx';
import styles from './NewChat.module.css';
import shared from '../../../styles/shared.module.css';
import steelBall from '../../../assets/images/steel-ball.png';

const NewChat = () => {
  const { users, isLoading } = useUsers();
  const { setPageContent } = usePageContentContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setFilteredUsers(users);

    if (search && search.trim() != '' && Array.isArray(users)) {
      setFilteredUsers(users.filter((user) => user.username.includes(search)));
    }
  }, [users, search, setFilteredUsers]);

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
          users: [{ id: selectedUser }],
        }),
      });
      // redirect to chats page
      setPageContent(pages.CHATS);
    } catch (error) {
      console.log(error);
      // error notification
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <section className={shared.headerContentInputLayout}>
      <header className={shared.header}>
        <h1 className={shared.title}>Users</h1>
      </header>
      <ul className={shared.contentWrapper}>
        {isLoading && (
          <li className={shared.loadingContainer}>
            <LoadingElement
              isVisible={isLoading}
              isAnimating={isLoading}
              style={{ maxWidth: 150 }}
            />
            <h2>Loading...</h2>
          </li>
        )}
        {filteredUsers &&
          filteredUsers.map((user) => (
            <li key={user.id} className={styles.userItemWrapper}>
              <label className={styles.userItem} htmlFor={user.id}>
                <img src={steelBall} alt="" className={styles.profilePicture} />
                <h3 className={styles.username}>{user.username}</h3>
                <input
                  type="radio"
                  name="user"
                  id={user.id}
                  onClick={() => setSelectedUser(user.id)}
                />
              </label>
            </li>
          ))}
      </ul>
      <TextInput
        value={search}
        setValue={setSearch}
        label="Create Chat"
        isDisabled={isDisabled}
        onClick={createChat}
      />
    </section>
  );
};

export { NewChat };
