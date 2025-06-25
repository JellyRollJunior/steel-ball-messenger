import { useCurrent } from '../../hooks/useCurrent.js';
import { usePageContentContext } from '../../hooks/usePageContentContext.js';
import { IconButton } from '../../components/IconButton/IconButton.jsx';
import { Chats } from './Chats/Chats.jsx';
import styles from './Homepage.module.css';
import shared from '../../styles/shared.module.css';
import steelBall from '../../assets/images/steel-ball.png';
import tusk from '../../assets/images/tusk.png';
import steelBallRun from '../../assets/images/SBR.png';
import { NewChat } from './NewChat/NewChat.jsx';
import { useState } from 'react';
import valentine from '../../assets/backgroundImages/funny-valentine.png';
import gyro from '../../assets/backgroundImages/gyro-headshot.png';

const pages = Object.freeze({
  CHATS: { name: 'Chats', icon: steelBall, backgroundImage: gyro },
  NEWCHAT: { name: 'New Chat', icon: steelBallRun, backgroundImage: valentine },
  EDITPROFILE: { name: 'Profile', icon: tusk, backgroundImage: gyro  },
});

const Homepage = () => {
  const { user } = useCurrent();
  const { pageContent, setPageContent } = usePageContentContext();
  const [ backgroundImage, setBackgroundImage] = useState(gyro)

  const renderMainContent = () => {
    switch (pageContent) {
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
        setPageContent(pages.CHATS.name);
    }
  };

  return (
    <div className={`${styles.pageLayout} ${shared.background}`} style={{backgroundImage: `url(${backgroundImage})`}}>
      <main className={styles.contentWrapper}>{renderMainContent()}</main>
      <nav className={`${styles.nav} ${shared.card}`}>
        {Object.values(pages).map((page) => (
          <div
            className={pageContent == page.name ? styles.selected : ''}
            key={page.name}
          >
            <IconButton
              onClick={() => {
                setBackgroundImage(page.backgroundImage);
                setPageContent(page.name)
              }}
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
