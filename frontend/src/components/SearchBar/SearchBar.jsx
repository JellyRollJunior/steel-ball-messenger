import { IconButton } from '../IconButton/IconButton.jsx';
import bug from '../../assets/images/bug.png';
import styles from './SearchBar.module.css';
import { useRef } from 'react';

const TextInput = ({ value, setValue, placeholder }) => {
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }

  return (
    <div className={styles.search}>
      <input
        ref={inputRef}
        id="input"
        className={styles.input}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        minLength={1}
        maxLength={250}
        placeholder={placeholder}
      />
      <label className={styles.button} htmlFor="input">
        <IconButton onClick={focusInput} icon={bug} size={32} alt="send button" />
      </label>
    </div>
  );
};

export { TextInput };
