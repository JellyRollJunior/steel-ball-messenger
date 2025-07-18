import { LoadingElement } from '../LoadingElement/LoadingElement.jsx';
import styles from './FullPageForm.module.css';
import shared from '../../styles/shared.module.css';
import gyroHeadshot from '../../assets/backgroundImages/gyro-headshot.png';

const FullPageForm = ({
  onSubmit,
  isLoading = false,
  backgroundImage = gyroHeadshot,
  children,
}) => {
  const backgroundImageStyling = { backgroundImage: `url(${backgroundImage})` };

  return (
    <div className={`${styles.pageLayout} ${shared.background}`} style={backgroundImageStyling}>
      <main className={`${styles.formWrapper} ${shared.card}`}>
        <LoadingElement
          isVisible={true}
          isAnimating={isLoading}
          style={{ maxWidth: '130px' }}
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
