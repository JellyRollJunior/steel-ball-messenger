import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../providers/UserContext/UserContext.jsx';
import { makeRequest } from '../../utils/requests.js';
import { getUrl } from '../../utils/serverUrl.js';
import { IconButton } from '../../components/IconButton/IconButton.jsx';
import { Chats } from './Chats/Chats.jsx';
import { CreateChat } from './CreateChat/CreateChat.jsx';
import { EditProfile } from './EditProfile/EditProfile.jsx';
import styles from './Homepage.module.css';
import shared from '../../styles/shared.module.css';
import steelBall from '../../assets/images/steel-ball.png';
import tusk from '../../assets/images/tusk.png';
import steelBallRun from '../../assets/images/SBR.png';

const pages = Object.freeze({
  CHATS: 'Chats',
  CREATECHAT: 'Create Chats',
  EDITPROFILE: 'Edit Profile',
});

const Homepage = () => {
  const { setUser } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(pages.CHATS);

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

  const renderMainContent = () => {
    switch (currentPage) {
      case pages.CHATS:
        return <Chats />;
      case pages.CREATECHAT:
        return <CreateChat />;
      case pages.EDITPROFILE:
        return <EditProfile />;
      default:
        return <Chats />;
    }
  };

  return (
    <>
      <div className={`${styles.pageLayout} ${shared.background}`}>
        <div className={styles.contentWrapper}>{renderMainContent()}</div>
        <nav className={`${styles.nav} ${shared.card}`}>
          <IconButton
            onClick={() => setCurrentPage(pages.CHATS)}
            label="Chats"
            icon={steelBall}
            size={52}
          />
          <IconButton
            onClick={() => setCurrentPage(pages.CREATECHAT)}
            label="New Chat"
            icon={steelBallRun}
            size={52}
          />
          <IconButton
            onClick={() => setCurrentPage(pages.EDITPROFILE)}
            label="Profile"
            icon={tusk}
            size={52}
          />
        </nav>
      </div>
    </>
  );
};

export { Homepage };
