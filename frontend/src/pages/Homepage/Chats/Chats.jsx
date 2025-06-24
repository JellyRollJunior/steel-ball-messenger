import { useChats } from '../../../hooks/useChats.js';
import { IconButton } from '../../../components/IconButton/IconButton.jsx';
import { LoadingElement } from '../../../components/LoadingElement/LoadingElement.jsx';
import steelBallRun from '../../../assets/images/SBR.png';
import steelBall from '../../../assets/images/steel-ball.png';
import shared from '../../../styles/shared.module.css';
import styles from './Chats.module.css';

// CHANGE HEADER POSITIONS TO USE GRID PROPERLY
// Remove scroll bar from scroll
const Chats = ({ userId, username }) => {
  const { chats, isLoading } = useChats();

  return (
    <section className={styles.pageLayout}>
      <header className={`${styles.header} ${shared.card}`}>
        <h1 className={`${styles.title} ${shared.card}`}>
          {username ? username : 'Username'}
        </h1>
        <IconButton icon={steelBallRun} alt="create chat icon" size={38} />
      </header>
      <h2 className={`${styles.sectionTitle} ${shared.card} ${shared.marginTopLarge}`}>Chats</h2>
      {isLoading && (
        <div className={`${styles.loadingWrapper} ${shared.card} ${shared.marginTopSmall}`}>
          <LoadingElement isVisible={isLoading} isAnimating={isLoading} style={{maxWidth: 150}} />
          <h2>Loading...</h2>
        </div>
      )}
      {chats && (
        <ul className={`${styles.chatsWrapper} ${shared.marginTopSmall}`}>
          {chats.map((chat) => (
            <li key={chat.id} className={`${styles.chatCard} ${shared.card}`}>
              <button className={styles.chatItem}>
                <img src={steelBall} alt="" className={styles.profilePicture} />
                <h3 className={styles.chatUsernames}>
                  {chat.users
                    .filter((user) => user.id != userId)
                    .map((user) => user.username)
                    .join(', ')}
                </h3>
                <p className={styles.latestMessage}>
                  {chat.latestMessage
                    ? chat.latestMessage.content
                    : 'Click to send a message'}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export { Chats };
