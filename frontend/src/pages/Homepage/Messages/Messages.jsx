import { useMessages } from "../../../hooks/useMessages.js";
import { IconButton } from "../../../components/IconButton/IconButton.jsx";
import styles from './Messages.module.css';
import shared from '../../../styles/shared.module.css';
import leftArrow from '../../../assets/icons/left-arrow.svg';

const Messages = ({ chatPartnerUsernames, chatId, returnToChats }) => {

  const { messages } = useMessages(chatId);

  return (
    <section className={styles.pageLayout}>
      <header className={styles.header}>
        <IconButton onClick={returnToChats} icon={leftArrow} size={26} />
        <h1 className={shared.title}>{chatPartnerUsernames}</h1>
      </header>
      <ul className={shared.vertContainer}>
        {messages && messages.map((message) => (
          <li className={styles.message}>
            <div>{message.content}</div>
            <div>{message.sendTime}</div>
            <div>{message.sender.username}</div>
          </li>
        ))}
      </ul>
      <form action=""></form>
      {/* {messages} */}
    </section>
  )
};

export { Messages }