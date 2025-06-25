import styles from './NewChat.module.css';
import shared from '../../../styles/shared.module.css'

const NewChat = () => {
  return (
    <section className={styles.pageLayout}>
      <header className={`${styles.header} ${shared.card}`}>
        <h1 className={`${styles.title}`}>
          New Chat
        </h1>
      </header>
      <h2 className={`${styles.sectionTitle} ${shared.card}`}>Users</h2>
      <ul>
        chatters
      </ul>
    </section>
  )
};

export { NewChat };
