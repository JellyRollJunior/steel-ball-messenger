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
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const Chats = ({ userId, username }) => {
  const { chats, isLoading, error, refetch } = useChats();
  const { createToast } = useContext(ToastContext);
  const { setPageContent } = useContext(PageContentContext);
  const [chatId, setChatId] = useState(null);
  const [chatPartnerUsernames, setChatPartnerUsernames] = useState('');
  const [chatPartnerId, setChatPartnerId] = useState(null);
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

  const getUsernames = (chat) => {
    return chat.users.length > 1
      ? chat.users
          .filter((user) => user.id != userId)
          .map((user) => user.username)
          .join(', ')
      : chat.users[0].username;
  };

  const getChatPartnerId = (chat) => {
    for (let i = 0; i < chat.users.length; i++) {
      if (chat.users[i].id != userId) {
        return chat.users[i].id;
      }
    }
  };

  const returnToChats = () => {
    setChatId(null);
    refetch();
  };

  const navigateToMessages = (id, chatName, chatPartnerId) => {
    setChatId(id);
    setChatPartnerUsernames(chatName);
    setChatPartnerId(chatPartnerId);
  };

  if (chatId) {
    return (
      <Messages
        userId={userId}
        chatId={chatId}
        chatPartnerUsernames={chatPartnerUsernames}
        chatPartnerId={chatPartnerId}
        returnToChats={returnToChats}
      />
    );
  }

  const nullChats = [];
  if (!chatId) {
    return (
      <motion.section
        className={shared.headerContentInputLayout}
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{
          type: 'spring',
          visualDuration: 0.2,
          bounce: 0.3,
        }}
        layout
      >
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
                      navigateToMessages(
                        chat.id,
                        getUsernames(chat),
                        getChatPartnerId(chat)
                      )
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
          {filteredChats && filteredChats.length == 0 && (
            <li className={shared.loadingContainer}>
              <img
                src={steelBallRun}
                alt="Cowboy riding a horse icon"
                style={{ width: 64 }}
              />
              <h3>No Chats Available</h3>
            </li>
          )}
        </ul>
        <TextInput
          value={search}
          setValue={setSearch}
          placeholder="Search Chats"
        />
      </motion.section>
    );
  }
};

export { Chats };
