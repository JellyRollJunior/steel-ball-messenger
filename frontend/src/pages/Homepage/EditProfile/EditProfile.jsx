import { useContext, useEffect } from 'react';
import { UserContext } from '../../../providers/UserContext/UserContext.jsx';

const EditProfile = ({ profileUserId }) => {
  const { id, fetchUser } = useContext(UserContext);

  useEffect(() => {
    if (!id) {
      fetchUser();
    }
  }, [id, fetchUser]);

  if (!profileUserId || profileUserId != id) return null;

  return <h2>hi, You are allowed to edit!</h2>;
};

export { EditProfile };
