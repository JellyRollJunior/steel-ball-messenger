import { useState } from 'react';
import styles from './Profile.module.css';
import shared from '../../../styles/shared.module.css';
import steelBall from '../../../assets/images/steel-ball.png';
import { handleTokenError } from '../../../utils/handleTokenError.js';
import { useNavigate } from 'react-router';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';

const Profile = ({ username = 'Username', bio = 'oops no bio!', refetchUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bioEdit, setBioEdit] = useState(bio);
  const navigate = useNavigate();

  const editBio = async () => {
    const token = localStorage.getItem('token');
    try {
      await makeRequest(getUrl('/current'), {
        mode: 'cors',
        method: 'PATCH',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bio: bioEdit,
        }),
      });
      refetchUser();
    } catch (error) {
      handleTokenError(error, navigate);
    }
  };

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
          {!isEditing && (
            <>
              <p>{bio}</p>
              <div className={styles.buttonHolder}>
                <button
                  className={styles.primaryButton}
                  onClick={() => {
                    setIsEditing(true);
                    setBioEdit(bio);
                  }}
                >
                  Edit
                </button>
              </div>
            </>
          )}
          {isEditing && (
            <>
              <textarea
                autoFocus
                className={styles.bioTextarea}
                value={bioEdit}
                onChange={(event) => setBioEdit(event.target.value)}
                minLength={1}
                maxLength={500}
              />
              <div className={styles.buttonHolder}>
                <button 
                  className={styles.primaryButton} 
                  onClick={() => {
                    editBio();
                    setIsEditing(false);
                  }}
                >
                  Confirm
                </button>
                <button
                  className={styles.secondaryButton}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export { Profile };
