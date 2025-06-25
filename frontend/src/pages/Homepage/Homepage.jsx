import { useCurrent } from '../../hooks/useCurrent.js';
import { usePageContentContext } from '../../hooks/usePageContentContext.js';
import { pages } from './pages.js';
import { IconButton } from '../../components/IconButton/IconButton.jsx';
import { Chats } from './Chats/Chats.jsx';
import { NewChat } from './NewChat/NewChat.jsx';
import styles from './Homepage.module.css';
import shared from '../../styles/shared.module.css';

const Homepage = () => {
  const { user } = useCurrent();
  const { pageContent, setPageContent } = usePageContentContext();

  const renderMainContent = () => {
    switch (pageContent.name) {
      case pages.NEWCHAT.name:
        return <NewChat />;
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
        setPageContent(pages.CHATS);
    }
  };

  return (
    <div
      className={`${styles.pageLayout} ${shared.background}`}
      style={{ backgroundImage: `url(${pageContent.backgroundImage})` }}
    >
      <main className={styles.contentWrapper}>{renderMainContent()}</main>
      <nav className={`${styles.nav} ${shared.card}`}>
        {Object.values(pages).map((page) => (
          <div
            className={pageContent == page.name ? styles.selected : ''}
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
