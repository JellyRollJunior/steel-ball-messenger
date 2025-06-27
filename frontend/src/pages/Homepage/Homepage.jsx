import { useNavigate } from 'react-router';
import { useCurrent } from '../../hooks/useCurrent.js';
import { usePageContentContext } from '../../hooks/usePageContentContext.js';
import { pages } from './pages.js';
import { IconButton } from '../../components/IconButton/IconButton.jsx';
import { Chats } from './Chats/Chats.jsx';
import { NewChat } from './NewChat/NewChat.jsx';
import { Profile } from './Profile/Profile.jsx';
import styles from './Homepage.module.css';
import shared from '../../styles/shared.module.css';
import gyro from '../../assets/backgroundImages/gyro-headshot.png';

const Homepage = () => {
  const { user } = useCurrent();
  const { pageContent, setPageContent } = usePageContentContext();
  // redirect to login if no token
  const navigate = useNavigate();
  if (!localStorage.getItem('token')) navigate('/login');

  const renderMainContent = () => {
    switch (pageContent.name) {
      case pages.NEWCHAT.name:
        return <NewChat />;
      case pages.PROFILE.name:
        return (
          <Profile
            username={user ? user.username : 'Username'}
            bio={user ? user.bio : 'Oops no bio!'}
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
      style={{ backgroundImage: `url(${ pageContent ? pageContent.backgroundImage : gyro })`}}
    >
      <main className={styles.contentWrapper}>{renderMainContent()}</main>
      <nav className={`${styles.nav} ${shared.card}`}>
        {Object.values(pages).map((page) => (
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
  );
};

export { Homepage };
