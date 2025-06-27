import styles from './Profile.module.css';
import shared from '../../../styles/shared.module.css';
import steelBall from '../../../assets/images/steel-ball.png';

const Profile = ({ username = 'Username', bio = 'oops no bio!' }) => {
  return (
    <section className={styles.pageLayout}>
      <header className={styles.header}>
        <h1 className={shared.title}>Profile</h1>
      </header>
      <div className={styles.contentWrapper}>
        <div className={styles.userInfo}>
          <img className={styles.profileImg} src={steelBall} alt="" />
          <h2>{username}</h2>
        </div>
      </div>
      <div className={styles.header}>
        <h2 className={shared.title}>Bio</h2>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.bio}>
          <p>{bio}</p>
        </div>
      </div>
    </section>
  );
};

export { Profile };
