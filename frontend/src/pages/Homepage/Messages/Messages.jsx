import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';
import { useMessages } from '../../../hooks/useMessages.js';
import { handleTokenError } from '../../../utils/handleTokenError.js';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';
import { IconButton } from '../../../components/IconButton/IconButton.jsx';
import { TextInput } from '../../../components/TextInput/TextInput.jsx';
import styles from './Messages.module.css';
import shared from '../../../styles/shared.module.css';
import leftArrow from '../../../assets/icons/left-arrow.svg';

const Messages = ({ userId, chatPartnerUsernames, chatId, returnToChats }) => {
  const { messages, refetch: refetchMessages } = useMessages(chatId);
  const [reversedMessages, setReverseMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() == '') return;
    try {
      setIsDisabled(true)
      const token = localStorage.getItem('token');
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
    } finally {
      setIsDisabled(false)
    }
  };

  useEffect(() => {
    if (Array.isArray(messages)) {
      setReverseMessages(messages.slice(0).reverse());
    }
  }, [messages]);

  return (
    <section className={shared.headerContentInputLayout}>
      <header className={styles.header}>
        <IconButton onClick={returnToChats} icon={leftArrow} size={26} />
        <h1 className={shared.title}>{chatPartnerUsernames}</h1>
      </header>
      <ul className={styles.messagesWrapper}>
        {reversedMessages &&
          reversedMessages.map((message, index) => (
            <li key={message.id} className={styles.messageWrapper}>
              {(index == reversedMessages.length - 1 ||
                (reversedMessages[index + 1] &&
                  new Date(message.sendTime) -
                    new Date(reversedMessages[index + 1].sendTime) >=
                    43200000)) && (
                // Create datetime bubble if last day was >= 12hr ago
                <div className={styles.date}>
                  {format(new Date(message.sendTime), 'EEEE LLLL do - h:mmaaa')}
                </div>
              )}
              <div
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
              </div>
            </li>
          ))}
        {reversedMessages && reversedMessages.length == 0 && (
          <li className={styles.messageWrapper}>
            <div className={styles.date}>
              Start the conversation!
            </div>
          </li>
        )}
      </ul>
      <form onSubmit={sendMessage}>
        <TextInput
          value={message}
          setValue={setMessage}
          minLength={1}
          maxLength={250}
          isDisabled={isDisabled}
        />
      </form>
    </section>
  );
};

export { Messages };
