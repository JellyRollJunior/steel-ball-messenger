import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ToastContext } from '../../providers/ToastContext/ToastContext.jsx';
import { useCurrent } from '../../hooks/useCurrent.js';
import { PageContentContext } from '../../providers/PageContentContext/PageContentContext.jsx';
import { pages } from './pages.js';
import { IconButton } from '../../components/IconButton/IconButton.jsx';
import { Chats } from './Chats/Chats.jsx';
import { NewChat } from './NewChat/NewChat.jsx';
import { Profile } from './Profile/Profile.jsx';
import styles from './Homepage.module.css';
import shared from '../../styles/shared.module.css';
import gyro from '../../assets/backgroundImages/gyro-headshot.png';
import { Messages } from './Messages/Messages.jsx';

const Homepage = () => {
  const { user, error, refetch } = useCurrent();
  const { createToast } = useContext(ToastContext);
  const { pageContent, setPageContent } = useContext(PageContentContext);

  // redirect to login if no token
  const navigate = useNavigate();
  if (!localStorage.getItem('token')) navigate('/login');

  useEffect(() => {
    if (error) {
      createToast('Unable to retrieve user info', true);
    }
  }, [createToast, error]);

  const renderMainContent = () => {
    switch (pageContent.name) {
      case pages.NEWCHAT.name:
        return <NewChat />;
      case pages.PROFILE.name:
        return (
          <Profile
            username={user ? user.username : 'Username'}
            bio={user ? user.bio : 'Oops no bio!'}
            refetchUser={refetch}
          />
        );
      case pages.CHATS.name:
        return (
          <Chats
            userId={user ? user.id : null}
            username={user ? user.username : null}
          />
        );
      default:
        setPageContent(pages.CHATS);
    }
  };

  return (
    <div
      className={`${styles.pageLayout} ${shared.background}`}
      style={{
        backgroundImage: `url(${
          pageContent ? pageContent.backgroundImage : gyro
        })`,
      }}
    >
      <div className={styles.mainLayout}>
        <main className={styles.contentWrapper}>{renderMainContent()}</main>
        <nav className={`${styles.nav} ${shared.card}`}>
          {Object.values(pages).map((page) => page.isNav && (
            <div
              className={pageContent.name == page.name ? styles.selected : ''}
              key={page.name}
            >
              <IconButton
                onClick={() => setPageContent(page)}
                label={page.name}
                icon={page.icon}
                size={52}
              />
            </div>
          ))}
        </nav>
      </div>
      <div className={styles.asideWrapper}>
        <Messages />
      </div>
    </div>
  );
};

export { Homepage };
