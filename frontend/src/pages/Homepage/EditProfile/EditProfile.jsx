import { useContext, useEffect } from 'react';
import { UserContext } from '../../../providers/UserContext/UserContext.jsx';

const EditProfile = ({ profileUserId }) => {
  const { id, getUser } = useContext(UserContext);

  useEffect(() => {
    if (!id) {
      getUser();
    }
  }, [id, getUser]);

  if (!profileUserId || profileUserId != id) return null;

  return <h2>hi, You are allowed to edit!</h2>;
};

export { EditProfile };
