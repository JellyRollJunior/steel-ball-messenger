import steelBall from '../../assets/images/steel-ball.png';
import styles from './LoadingElement.module.css';

const LoadingElement = ({ isVisible = false, isAnimating = false, style }) => {
  if (!isVisible) return null;

  return (
    <img
      style={style}
      className={isAnimating ? styles.animate : null}
      src={steelBall}
      alt="Gyro's green steel ball rotating (loading animation)"
    />
  );
};

export { LoadingElement };
