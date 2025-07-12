import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContext } from '../../providers/ToastContext/ToastContext.jsx';
import { useCurrent } from '../../hooks/useCurrent.js';
import { PageContentContext } from '../../providers/PageContentContext/PageContentContext.jsx';
import { pages } from './pages.js';
import { IconButton } from '../../components/IconButton/IconButton.jsx';
import { Chats } from './Chats/Chats.jsx';
import { Messages } from './Messages/Messages.jsx';
import { NewChat } from './NewChat/NewChat.jsx';
import { Profile } from './Profile/Profile.jsx';
import { ChatterProfile } from './ChatterProfile/ChatterProfile.jsx';
import styles from './Homepage.module.css';
import shared from '../../styles/shared.module.css';
import gyro from '../../assets/backgroundImages/gyro-headshot.png';
import github from '../../assets/icons/github-60.png';
import instagram from '../../assets/icons/instagram-60.png';
import linkedin from '../../assets/icons/linkedin-60.png';

const Homepage = () => {
  const { user, error, refetch } = useCurrent();
  const { createToast } = useContext(ToastContext);
  const { pageContent, setPageContent } = useContext(PageContentContext);
  const [messagesData, setMessagesData] = useState(null);
  const [chatPartner, setChatPartner] = useState(null);

  // redirect to login if no token
  const navigate = useNavigate();
  if (!localStorage.getItem('token')) navigate('/login');

  useEffect(() => {
    if (error) {
      createToast('Unable to retrieve user info', true);
    }
  }, [createToast, error]);

  const renderMessages = (chatId, usernames, chatPartnerId) => {
    setMessagesData({
      chatId,
      usernames,
      chatPartnerId,
    });
    setPageContent(pages.MESSAGES);
  };

  const renderChatterProfile = (chatPartnerId) => {
    setChatPartner({
      id: chatPartnerId,
    });
    setPageContent(pages.CHATTERPROFILE);
  };

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
            renderMessages={renderMessages}
          />
        );
      case pages.MESSAGES.name:
        // if screensize <= 1000
        //  - render messages
        //  - else, do not render messages, render chats
        return window.innerWidth <= 1000 ? (
          <Messages
            userId={user ? user.id : null}
            chatId={messagesData ? messagesData.chatId : null}
            chatPartnerId={messagesData ? messagesData.chatPartnerId : null}
            chatPartnerUsernames={messagesData ? messagesData.usernames : null}
            renderChatterProfile={renderChatterProfile}
          />
        ) : (
          <Chats
            userId={user ? user.id : null}
            username={user ? user.username : null}
            renderMessages={renderMessages}
          />
        );
      case pages.CHATTERPROFILE.name:
        return (
          <ChatterProfile
            userId={chatPartner.id}
            renderMessages={() =>
              messagesData
                ? renderMessages(
                    messagesData.chatId,
                    messagesData.usernames,
                    messagesData.chatPartnerId
                  )
                : setPageContent(pages.CHATS)
            }
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
          {Object.values(pages).map(
            (page) =>
              page.isNav && (
                <div
                  className={
                    pageContent.name == page.name ? styles.selected : ''
                  }
                  key={page.name}
                >
                  <IconButton
                    onClick={() => setPageContent(page)}
                    label={page.name}
                    icon={page.icon}
                    size={52}
                  />
                </div>
              )
          )}
        </nav>
      </div>
      <div className={styles.mainLayout}>
        <div className={styles.asideWrapper}>
          <Messages
            userId={user ? user.id : null}
            chatId={messagesData ? messagesData.chatId : null}
            chatPartnerId={messagesData ? messagesData.chatPartnerId : null}
            chatPartnerUsernames={messagesData ? messagesData.usernames : null}
            renderChatterProfile={renderChatterProfile}
            isBackButtonShown={false}
          />
        </div>
        <footer className={styles.footerWrapper}>
          <div className={`${styles.footer} ${shared.card}`}>
            <div className={styles.buttonHolder}>
              <a href="https://github.com/jellyrolljunior" target="”_blank”">
                <IconButton icon={github} size={36} />
              </a>
              <a
                href="https://www.instagram.com/river.flows__"
                target="”_blank”"
              >
                <IconButton icon={instagram} size={36} />
              </a>
              <a
                href="https://www.linkedin.com/in/jellyrolljunior/"
                target="”_blank”"
              >
                <IconButton icon={linkedin} size={36} />
              </a>
            </div>
            <p>Created by JellyRollJunior (Brandon Lin)</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export { Homepage };
