import { useContext, useEffect, useState } from 'react';
import { useChats } from '../../../hooks/useChats.js';
import { ToastContext } from '../../../providers/ToastContext/ToastContext.jsx';
import { PageContentContext } from '../../../providers/PageContentContext/PageContentContext.jsx';
import { pages } from '../pages.js';
import { Messages } from '../Messages/Messages.jsx';
import { IconButton } from '../../../components/IconButton/IconButton.jsx';
import { LoadingElement } from '../../../components/LoadingElement/LoadingElement.jsx';
import { ChatItem } from './ChatItem.jsx';
import { TextInput } from '../../../components/TextInput/TextInput.jsx';
import styles from './Chats.module.css';
import shared from '../../../styles/shared.module.css';
import steelBallRun from '../../../assets/images/SBR.png';

const Chats = ({ userId, username }) => {
  const { chats, isLoading, error, refetch } = useChats();
  const { createToast } = useContext(ToastContext);
  const { setPageContent } = useContext(PageContentContext);
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

    if (error) {
      createToast('Unable to retrieve chats', true);
    }
  }, [userId, chats, search, setFilteredChats, error, createToast]);

  const returnToChats = () => {
    setChatId(null);
    refetch();
  };

  const navigateToMessages = (id, chatName) => {
    setChatId(id);
    setChatPartnerUsernames(chatName);
  };

  const getUsernames = (chat) => {
    return chat.users.length > 1
      ? chat.users
          .filter((user) => user.id != userId)
          .map((user) => user.username)
          .join(', ')
      : chat.users[0].username;
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

  const nullChats = [];
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
            filteredChats.map((chat) => {
              if (chat.latestMessage) {
                return (
                  <ChatItem
                    key={chat.id}
                    usernames={getUsernames(chat)}
                    latestMessage={
                      chat.latestMessage ? chat.latestMessage.content : null
                    }
                    onClick={() =>
                      navigateToMessages(chat.id, getUsernames(chat))
                    }
                  />
                );
              } else {
                nullChats.push(chat.id);
              }
            })}
          {filteredChats &&
            nullChats &&
            filteredChats.map(
              (chat) =>
                nullChats.includes(chat.id) && (
                  <ChatItem
                    key={chat.id}
                    usernames={getUsernames(chat)}
                    latestMessage={
                      chat.latestMessage ? chat.latestMessage.content : null
                    }
                    onClick={() =>
                      navigateToMessages(chat.id, getUsernames(chat))
                    }
                  />
                )
            )}
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
