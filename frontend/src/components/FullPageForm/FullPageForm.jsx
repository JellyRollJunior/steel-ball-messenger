import styles from './FullPageForm.module.css';
import shared from '../../styles/shared.module.css';
import steelBall from '../../assets/images/steel-ball.png';

const FullPageForm = ({ onSubmit, children }) => {
  return (
    <div className={styles.pageWrapper}>
      <main className={`${styles.formWrapper} ${shared.card}`}>
        <img
          className={styles.formImage}
          src={steelBall}
          alt="Gyro's green steel ball"
        />
        <h1 className={styles.formTitle}>
          <i>S.B.M</i>
          <br />
          <span>Steel Ball Messenger</span>
        </h1>
        <form onSubmit={onSubmit} className={styles.form}>
          {children}
        </form>
      </main>
    </div>
  );
};

export { FullPageForm };
