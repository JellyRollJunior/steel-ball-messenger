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
  CHATS: { name: 'Chats', icon: steelBall },
  CREATECHAT: { name: 'New Chat', icon: steelBallRun },
  EDITPROFILE: { name: 'Profile', icon: tusk },
});

const Homepage = () => {
  const { user } = useCurrent();
  const { pageContent, setPageContent } = usePageContentContext();

  const renderMainContent = () => {
    switch (pageContent) {
      case pages.CREATECHAT.name:
        return <Chats />;
      case pages.EDITPROFILE.name:
        return <Chats />;
      case pages.CHATS.name:
        return (
          <Chats
            userId={user ? user.id : null}
            username={user ? user.username : null}
          />
        );
      default:
        setPageContent(pages.CHATS.name);
    }
  };

  return (
    <div className={`${styles.pageLayout} ${shared.background}`}>
      <div className={styles.contentWrapper}>{renderMainContent()}</div>
      <nav className={`${styles.nav} ${shared.card}`}>
        {Object.values(pages).map((page) => (
          <div
            className={pageContent == page.name ? styles.selected : ''}
            key={page.name}
          >
            <IconButton
              onClick={() => setPageContent(page.name)}
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
