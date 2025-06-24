import { useCurrent } from '../../hooks/useCurrent.js';
import { usePageContentContext } from '../../hooks/usePageContentContext.js';
import { IconButton } from '../../components/IconButton/IconButton.jsx';
import { Chats } from './Chats/Chats.jsx';
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
  const { user } = useCurrent();
  const { pageContent, setPageContent } = usePageContentContext(pages.CHATS);

  const renderMainContent = () => {
    switch (pageContent) {
      case pages.CREATECHAT:
        return <Chats />;
      case pages.EDITPROFILE:
        return <Chats />;
      case pages.CHATS:
      default:
        return (
          <Chats
            userId={user ? user.id : null}
            username={user ? user.username : null}
          />
        );
    }
  };

  return (
    <div className={`${styles.pageLayout} ${shared.background}`}>
      <div className={styles.contentWrapper}>{renderMainContent()}</div>
      <nav className={`${styles.nav} ${shared.card}`}>
        <IconButton
          onClick={() => setPageContent(pages.CHATS)}
          label="Chats"
          icon={steelBall}
          size={52}
        />
        <IconButton
          onClick={() => setPageContent(pages.CREATECHAT)}
          label="New Chat"
          icon={steelBallRun}
          size={52}
        />
        <IconButton
          onClick={() => setPageContent(pages.EDITPROFILE)}
          label="Profile"
          icon={tusk}
          size={52}
        />
      </nav>
    </div>
  );
};

export { Homepage };
