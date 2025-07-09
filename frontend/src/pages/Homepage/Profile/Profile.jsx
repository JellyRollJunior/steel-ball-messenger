import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContext } from '../../../providers/ToastContext/ToastContext.jsx';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';
import { handleTokenError } from '../../../utils/handleTokenError.js';
import { IconButton } from '../../../components/IconButton/IconButton.jsx';
import { logout } from '../../../utils/logout.js';
import styles from './Profile.module.css';
import shared from '../../../styles/shared.module.css';
import steelBall from '../../../assets/images/steel-ball.png';
import horseshoe from '../../../assets/images/horseshoe.png';

const Profile = ({
  username = 'Username',
  bio = 'oops no bio!',
  refetchUser,
}) => {
  const navigate = useNavigate();
  const { createToast } = useContext(ToastContext);
  const [isEditing, setIsEditing] = useState(false);
  const [bioEdit, setBioEdit] = useState(bio);
  const [isDisabled, setIsDisabled] = useState(false);

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
      createToast('Unable to edit bio', true);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <section className={styles.pageLayout}>
      <div className={styles.widget}>
        <h2 className={styles.title}>Username</h2>
        <h1 className={styles.username}>{username}</h1>
      </div>
      <div className={styles.widget}>
        <h2 className={styles.title}>Bio</h2>
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
      <div className={styles.horizontalWidgetGroup}>
        <div className={styles.logout}>
          <div className={styles.buttonWrapper}>
            <IconButton
              onClick={() => logout(navigate)}
              icon={horseshoe}
              label="Logout"
              size={52}
              alt="Logout button"
              style={{ fontWeight: 'bold' }}
            />
          </div>
        </div>
        <div className={styles.widget}>
          <h2 className={styles.title}>Icon</h2>
          <img
            className={`${styles.profileImg} ${shared.marginTopSmall}`}
            src={steelBall}
            alt="User icon"
          />
        </div>
      </div>
    </section>
  );
};

export { Profile };
