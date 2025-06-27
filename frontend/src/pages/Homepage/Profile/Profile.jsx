import { useState } from 'react';
import styles from './Profile.module.css';
import shared from '../../../styles/shared.module.css';
import steelBall from '../../../assets/images/steel-ball.png';

const Profile = ({ username = 'Username', bio = 'oops no bio!' }) => {
  const [isEditing, setIsEditing] = useState(false);

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
      <div className={styles.bioHeader}>
        <h2 className={shared.title}>Bio</h2>
        <button onClick={() => setIsEditing(!isEditing)} className={styles.headerButton}>Edit</button>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.bio}>
          {!isEditing && <p>{bio}</p>}
          {isEditing && <textarea autoFocus className={styles.editBio} defaultValue={bio}></textarea>}
        </div>
      </div>
    </section>
  );
};

export { Profile };
