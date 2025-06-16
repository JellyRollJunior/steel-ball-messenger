import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../providers/UserContext/UserContext.jsx';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';

const EditProfile = ({ profileUserId, setProfile, userBio = '' }) => {
  const { id, fetchUser } = useContext(UserContext);
  const [isEditDisplayed, setIsEditDisplayed] = useState(false);
  const [bio, setBio] = useState(userBio)
  const formStyle = !isEditDisplayed
    ? { display: 'none' }
    : { display: 'block' };

  useEffect(() => {
    if (!id) {
      fetchUser();
    }
    setBio(userBio)
  }, [id, fetchUser, userBio]);

  const editProfile = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const data = await makeRequest(getUrl('/current'), {
        mode: 'cors',
        method: 'PATCH',
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio })
      })
      console.log(data);
      setProfile(data);
      setIsEditDisplayed(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (!profileUserId || profileUserId != id) {
    return null;
  }
  return (
    <>
      <button onClick={() => setIsEditDisplayed(!isEditDisplayed)}>
        Edit Profile
      </button>
      <form style={formStyle} onSubmit={editProfile}>
        <label htmlFor="bio">Bio: </label>
        <input type="text" name="bio" id="bio" value={bio} onChange={(event) => setBio(event.target.value)} />
        <button>Edit</button>
      </form>
    </>
  );
};

export { EditProfile };
