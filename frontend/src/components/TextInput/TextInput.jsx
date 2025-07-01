import { IconButton } from '../IconButton/IconButton.jsx';
import bug from '../../assets/images/bug.png';
import styles from './TextInput.module.css';
import { useRef } from 'react';

const TextInput = ({
  value,
  setValue,
  placeholder,
  minLength = 0,
  maxLength = 24,
  label = '',
  isDisabled = false,
  onClick = () => {},
}) => {
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.holder}>
      <input
        ref={inputRef}
        id="input"
        className={styles.input}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      <label className={styles.button} htmlFor="input">
        <IconButton
          onClick={() => {
            focusInput();
            onClick();
          }}
          icon={bug}
          size={32}
          alt="send button"
          label={label}
          style={{ fontSize: '0.8rem' }}
          isDisabled={isDisabled}
        />
      </label>
    </div>
  );
};

export { TextInput };
