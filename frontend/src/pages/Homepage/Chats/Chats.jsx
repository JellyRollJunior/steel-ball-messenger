import { useEffect, useState } from 'react';
import { useChats } from '../../../hooks/useChats.js';
import { usePageContentContext } from '../../../hooks/usePageContentContext.js';
import { pages } from '../pages.js';
import { Messages } from '../Messages/Messages.jsx';
import { IconButton } from '../../../components/IconButton/IconButton.jsx';
import { LoadingElement } from '../../../components/LoadingElement/LoadingElement.jsx';
import { TextInput } from '../../../components/TextInput/TextInput.jsx';
import styles from './Chats.module.css';
import shared from '../../../styles/shared.module.css';
import steelBallRun from '../../../assets/images/SBR.png';
import steelBall from '../../../assets/images/steel-ball.png';

const Chats = ({ userId, username }) => {
  const { chats, isLoading } = useChats();
  const { setPageContent } = usePageContentContext();
  const [chatId, setChatId] = useState(null);
  const [chatPartnerUsernames, setChatPartnerUsernames] = useState('');
  const [search, setSearch] = useState('');
  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    setFilteredChats(chats);

    //  filter chats by username
    //    rule 1: Exclude our own username from search filter
    //    rule 2: UNLESS the chat contains only current user (self chat)!
    if (search && search.trim() != '' && Array.isArray(chats)) {
      setFilteredChats(
        chats.filter((chat) =>
          chat.users.reduce(
            (accumulator, user) =>
              accumulator ||
              (user.id != userId
                ? user.username.includes(search)
                : chat.users.length == 1 && user.username.includes(search)),
            false
          )
        )
      );
    }
  }, [search, setFilteredChats, chats, userId]);

  const returnToChats = () => {
    setChatId(null);
  };

  if (chatId) {
    return (
      <Messages
        userId={userId}
        chatId={chatId}
        chatPartnerUsernames={chatPartnerUsernames}
        returnToChats={returnToChats}
      />
    );
  }

  if (!chatId) {
    return (
      <section className={shared.headerContentInputLayout}>
        <header className={styles.header}>
          <h1 className={shared.title}>{username ? username : 'Username'}</h1>
          <IconButton
            onClick={() => setPageContent(pages.NEWCHAT)}
            icon={steelBallRun}
            alt="create chat icon"
            size={34}
          />
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
          {filteredChats &&
            filteredChats.map((chat) => (
              <li key={chat.id} className={styles.chatItemWrapper}>
                <button
                  className={styles.chatItem}
                  onClick={() => {
                    setChatId(chat.id);
                    setChatPartnerUsernames(
                      chat.users
                        .filter((user) => user.id != userId)
                        .map((user) => user.username)
                        .join(', ')
                    );
                  }}
                >
                  <img
                    src={steelBall}
                    alt="Profile picture"
                    className={styles.profilePicture}
                  />
                  <h3 className={styles.chatUsernames}>
                    {chat.users
                      .filter((user) => user.id != userId)
                      .map((user) => user.username)
                      .join(', ')}
                  </h3>
                  <p className={styles.latestMessage}>
                    {chat.latestMessage
                      ? chat.latestMessage.content
                      : 'Send a message'}
                  </p>
                </button>
              </li>
            ))}
        </ul>
        <TextInput
          value={search}
          setValue={setSearch}
          placeholder="Search Chats"
        />
      </section>
    );
  }
};

export { Chats };
