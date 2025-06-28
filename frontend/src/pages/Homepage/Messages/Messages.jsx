import { useMessages } from "../../../hooks/useMessages.js";
import { IconButton } from "../../../components/IconButton/IconButton.jsx";
import styles from './Messages.module.css';
import shared from '../../../styles/shared.module.css';
import leftArrow from '../../../assets/icons/left-arrow.svg';
import { format} from 'date-fns'

const Messages = ({ userId, chatPartnerUsernames, chatId, returnToChats }) => {

  const { messages } = useMessages(chatId);

  return (
    <section className={styles.pageLayout}>
      <header className={styles.header}>
        <IconButton onClick={returnToChats} icon={leftArrow} size={26} />
        <h1 className={shared.title}>{chatPartnerUsernames}</h1>
      </header>
      <ul className={styles.messagesWrapper}>
        {messages && messages.map((message) => (
          <li key={message.id} className={message.sender && message.sender.id == userId ? styles.myMessage : styles.theirMessage}>
            <div>{message.content}</div>
            <div>{format(new Date(message.sendTime), 'LLL d, yyyy - h:mmaaa')}</div>
          </li>
        ))}
      </ul>
      <form action=""></form>
    </section>
  )
};

export { Messages }