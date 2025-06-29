import { useState } from 'react';
import { format } from 'date-fns';
import { useMessages } from '../../../hooks/useMessages.js';
import { IconButton } from '../../../components/IconButton/IconButton.jsx';
import styles from './Messages.module.css';
import shared from '../../../styles/shared.module.css';
import leftArrow from '../../../assets/icons/left-arrow.svg';
import bug from '../../../assets/images/bug.png';
import { handleTokenError } from '../../../utils/handleTokenError.js';
import { useNavigate } from 'react-router';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';

const Messages = ({ userId, chatPartnerUsernames, chatId, returnToChats }) => {
  const { messages, refetch: refetchMessages } = useMessages(chatId);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() == '') return;
    const token = localStorage.getItem('token');
    try {
      await makeRequest(getUrl(`/chats/${chatId}/messages`), {
        mode: 'cors',
        method: 'POST',
        headers: {
          authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message,
        }),
      });
      refetchMessages();
      setMessage('');
    } catch (error) {
      handleTokenError(error, navigate);
    }
  };

  return (
    <section className={styles.pageLayout}>
      <header className={styles.header}>
        <IconButton onClick={returnToChats} icon={leftArrow} size={26} />
        <h1 className={shared.title}>{chatPartnerUsernames}</h1>
      </header>
      <ul className={styles.messagesWrapper}>
        {messages &&
          messages.map((message, index) => (
            <>
              {(index == 0 ||
                new Date(message.sendTime) -
                  new Date(messages[index - 1].sendTime) >=
                  43200000) && (
                // Show datetime if last day was >= 12hr ago
                <div key={message.sendTime} className={styles.date}>
                  {format(new Date(message.sendTime), 'EEEE LLLL do - h:mmaaa')}
                </div>
              )}
              <li
                key={message.id}
                className={
                  message.sender && message.sender.id == userId
                    ? styles.myMessage
                    : styles.theirMessage
                }
              >
                <div>{message.content}</div>
                <div className={styles.time}>
                  {format(new Date(message.sendTime), 'h:mmaaa')}
                </div>
              </li>
            </>
          ))}
      </ul>
      <form onSubmit={sendMessage} className={styles.send}>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          minLength={1}
          maxLength={250}
        />
        <IconButton icon={bug} size={32} onClick={() => console.log('clicked')} alt='send button' />
      </form>
    </section>
  );
};

export { Messages };
