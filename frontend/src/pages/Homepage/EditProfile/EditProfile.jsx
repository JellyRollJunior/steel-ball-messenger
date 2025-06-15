import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../providers/UserContext/UserContext.jsx';

const EditProfile = ({ profileUserId }) => {
  const { id, fetchUser } = useContext(UserContext);
  const [isEditDisplayed, setIsEditDisplayed] = useState(false);
  const formStyle = !isEditDisplayed
    ? { display: 'none' }
    : { display: 'block' };

  useEffect(() => {
    if (!id) {
      fetchUser();
    }
  }, [id, fetchUser]);

  if (!profileUserId || profileUserId != id) {
    return null;
  }
  return (
    <>
      <button onClick={() => setIsEditDisplayed(!isEditDisplayed)}>
        Edit Profile
      </button>
      <form style={formStyle}>
        <label htmlFor="bio">Bio: </label>
        <input type="text" name="bio" id="bio" />
        <button>Edit</button>
      </form>
    </>
  );
};

export { EditProfile };
