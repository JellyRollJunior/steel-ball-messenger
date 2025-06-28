import { format} from 'date-fns'
import { useMessages } from "../../../hooks/useMessages.js";
import { IconButton } from "../../../components/IconButton/IconButton.jsx";
import styles from './Messages.module.css';
import shared from '../../../styles/shared.module.css';
import leftArrow from '../../../assets/icons/left-arrow.svg';
import bug from '../../../assets/images/bug.png';

const Messages = ({ userId, chatPartnerUsernames, chatId, returnToChats }) => {

  const { messages } = useMessages(chatId);

  return (
    <section className={styles.pageLayout}>
      <header className={styles.header}>
        <IconButton onClick={returnToChats} icon={leftArrow} size={26} />
        <h1 className={shared.title}>{chatPartnerUsernames}</h1>
      </header>
      <ul className={styles.messagesWrapper}>
        {messages && messages.map((message, index) => (
          <>
            {(index == 0 
              || (new Date(message.sendTime)) - new Date(messages[index - 1].sendTime) >= 43200000) && ( // Show date if last day was >= 12hr ago
              <div className={styles.date}>
                {format(new Date(message.sendTime), 'EEEE LLLL do - h:mmaaa')}
              </div>
            )}
            <li key={message.id} className={message.sender && message.sender.id == userId ? styles.myMessage : styles.theirMessage}>
              <div>{message.content}</div>
              <div className={styles.time}>
                {format(new Date(message.sendTime), 'h:mmaaa')}
              </div>
            </li>
          </>
        ))}
      </ul>
      <form className={styles.send}>
        <input type="text" />
        <IconButton icon={bug} size={32} />
      </form>
    </section>
  )
};

export { Messages }