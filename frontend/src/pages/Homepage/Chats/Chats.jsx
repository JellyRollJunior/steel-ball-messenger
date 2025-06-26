import { useChats } from '../../../hooks/useChats.js';
import { IconButton } from '../../../components/IconButton/IconButton.jsx';
import { LoadingElement } from '../../../components/LoadingElement/LoadingElement.jsx';
import styles from './Chats.module.css';
import shared from '../../../styles/shared.module.css';
import steelBallRun from '../../../assets/images/SBR.png';
import steelBall from '../../../assets/images/steel-ball.png';

const Chats = ({ userId, username }) => {
  const { chats, isLoading } = useChats();

  return (
    <section className={styles.pageLayout}>
      <header className={`${styles.header}`}>
        <h1 className={`${shared.title}`}>
          {username ? username : 'Username'}
        </h1>
        <IconButton icon={steelBallRun} alt="create chat icon" size={34} />
      </header>
      <h2 className={`${styles.sectionTitle} ${shared.card}`}>Chats</h2>
      {isLoading && (
        <div className={`${styles.loadingWrapper} ${shared.marginTopSmall}`}>
          <LoadingElement isVisible={isLoading} isAnimating={isLoading} style={{maxWidth: 150}} />
          <h2>Loading...</h2>
        </div>
      )}
      {chats && (
        <ul className={`${shared.vertContainer}`}>
          {chats.map((chat) => (
            <li key={chat.id} className={shared.vertContainerItem}>
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
