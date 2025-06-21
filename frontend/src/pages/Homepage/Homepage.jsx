import { useContext, useEffect, useReducer } from 'react';
import { UserContext } from '../../providers/UserContext/UserContext.jsx';
import { makeRequest } from '../../utils/requests.js';
import { getUrl } from '../../utils/serverUrl.js';
import { Chats } from './Chats/Chats.jsx';
import { IconButton } from '../../components/IconButton/IconButton.jsx';
import styles from './Homepage.module.css';
import shared from '../../styles/shared.module.css';
import steelBall from '../../assets/images/steel-ball.png';
import { CreateChat } from './CreateChat/CreateChat.jsx';
import { EditProfile } from './EditProfile/EditProfile.jsx';

const Homepage = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await makeRequest(getUrl('/current'), {
          mode: 'cors',
          method: 'GET',
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setUser(data.id, data.username, data.bio);
        return data;
      } catch (error) {
        console.log(error);
        // todo: throw notification if error
      }
    };

    fetchUser();
  }, [setUser]);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'render_chats': {
        return { currentPage: 'Chats' };
      }
      case 'render_create_chat': {
        return { currentPage: 'Create Chats' };
      }
      default: {
        return { currentPage: 'Chats' };
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, { currentPage: 'Chats' });

  const renderMainContent = () => {
    switch (state.currentPage) {
      case 'Chats':
        return <Chats />;
      case 'Create Chats':
        return <CreateChat />;
      case 'Edit Profile':
        return <EditProfile />;
      default:
        return <Chats />;
    }
  };

  return (
    <>
      <div className={`${styles.pageLayout} ${shared.background}`}>
        {renderMainContent()}
        <nav className={`${styles.nav} ${shared.card}`}>
          <IconButton icon={steelBall} size={56} onClick={() => dispatch({ type: 'render_chats'})} />
          <IconButton icon={steelBall} size={56} onClick={() => dispatch({ type: 'render_create_chat'})} />
          <IconButton icon={steelBall} size={56} />
        </nav>
      </div>
    </>
  );
};

export { Homepage };
