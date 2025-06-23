import styles from './IconButton.module.css';

const IconButton = ({ icon, alt, onClick, label = '', size = 30 }) => {
  return (
    <div className={styles.wrapper}>
      <button
        onClick={onClick}
        style={{ height: size, width: size }}
        className={`${styles.createChatBtn} ${styles.iconButton}`}
      >
        <img src={icon} alt={alt} />
      </button>
      {label != '' && <p className={styles.label}>{label}</p>}
    </div>
  );
};

export { IconButton };
