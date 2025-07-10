import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContext } from '../../../providers/ToastContext/ToastContext.jsx';
import { PageContentContext } from '../../../providers/PageContentContext/PageContentContext.jsx';
import { pages } from '../pages.js';
import { useUsers } from '../../../hooks/useUsers.js';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';
import { handleTokenError } from '../../../utils/handleTokenError.js';
import { LoadingElement } from '../../../components/LoadingElement/LoadingElement.jsx';
import { TextInput } from '../../../components/TextInput/TextInput.jsx';
import styles from './NewChat.module.css';
import shared from '../../../styles/shared.module.css';
import steelBall from '../../../assets/images/steel-ball.png';
import d4c from '../../../assets/images/D4C.png';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const NewChat = () => {
  const navigate = useNavigate();
  const { users, isLoading, error } = useUsers();
  const { createToast } = useContext(ToastContext);
  const { setPageContent } = useContext(PageContentContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setFilteredUsers(users);

    if (search && search.trim() != '' && Array.isArray(users)) {
      setFilteredUsers(users.filter((user) => user.username.includes(search)));
    }

    if (error) {
      createToast('Unable to fetch users', true);
    }
  }, [users, search, setFilteredUsers, error, createToast]);

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
      createToast('Chat created successfully!');
    } catch (error) {
      handleTokenError(error, navigate);
      createToast('Unable to create chat', true);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <motion.section
      className={shared.headerContentInputLayout}
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      transition={{
        type: 'spring',
        visualDuration: 0.2,
        bounce: 0.2,
      }}
      layout
    >
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
        {filteredUsers && filteredUsers.length == 0 && (
          <li className={shared.loadingContainer}>
            <img
              src={d4c}
              alt="Dirty Deeds Done Dirty Cheap"
              style={{ width: 160 }}
            />
            <h3>No Users Available</h3>
          </li>
        )}
      </ul>
      <TextInput
        value={search}
        setValue={setSearch}
        label="Create Chat"
        isDisabled={isDisabled}
        onClick={createChat}
      />
    </motion.section>
  );
};

export { NewChat };
