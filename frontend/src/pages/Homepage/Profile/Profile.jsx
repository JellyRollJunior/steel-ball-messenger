import { useState } from 'react';
import styles from './Profile.module.css';
import shared from '../../../styles/shared.module.css';
import steelBall from '../../../assets/images/steel-ball.png';
import { handleTokenError } from '../../../utils/handleTokenError.js';
import { useNavigate } from 'react-router';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';

const Profile = ({
  username = 'Username',
  bio = 'oops no bio!',
  refetchUser,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bioEdit, setBioEdit] = useState(bio);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const editBio = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      setIsDisabled(true);
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
    } finally {
      setIsDisabled(false);
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
        {!isEditing && (
          <div className={styles.bio}>
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
          </div>
        )}
        {isEditing && (
          <form
            className={styles.bio}
            onSubmit={(event) => {
              editBio(event);
              setIsEditing(false);
            }}
          >
            <textarea
              autoFocus
              className={styles.bioTextarea}
              value={bioEdit}
              onChange={(event) => setBioEdit(event.target.value)}
              minLength={1}
              maxLength={500}
            />
            <div className={styles.buttonHolder}>
              <button className={styles.primaryButton} disabled={isDisabled}>
                Confirm
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setIsEditing(false)}
                disabled={isDisabled}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export { Profile };
