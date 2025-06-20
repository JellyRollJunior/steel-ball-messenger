import styles from './IconButton.module.css';

const IconButton = ({ icon, alt, onClick, size = 30 }) => {
  return (
    <button
      onClick={onClick}
      style={{ height: size, width: size }}
      className={`${styles.createChatBtn} ${styles.iconButton}`}
    >
      <img src={icon} alt={alt} />
    </button>
  );
};

export { IconButton };
