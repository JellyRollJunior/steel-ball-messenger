import styles from './IconButton.module.css';

const IconButton = ({ icon, alt, onClick, label = '', size = 30, style }) => {
  return (
    <div className={styles.wrapper} style={style ? style : {}}>
      <button
        onClick={onClick}
        style={{ height: size, width: size }}
        className={styles.iconButton}
      >
        <img src={icon} alt={alt} />
      </button>
      {label != '' && <p className={styles.label}>{label}</p>}
    </div>
  );
};

export { IconButton };
