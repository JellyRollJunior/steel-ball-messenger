import { useContext } from 'react';
import { useProfiles } from '../../../hooks/useProfiles.js';
import { UserContext } from '../../../providers/UserContext/UserContextProvide.jsx';

const Profiles = ({ userId = 22 }) => {
  const { id, username} = useContext(UserContext);
  const { profile, isLoading, error } = useProfiles(userId);

  if (!userId) return null;

  return (
    <section>
      {error && <h2>{error}</h2>}
      {isLoading && <h2>loading chats</h2>}

      <h2>Profiles</h2>
      <h3>Its me: {id}</h3>
      <h3>its me: {username}</h3>
      {profile && profile.bio && (
        <p>
          {profile.bio}
        </p>
      )}
      {!profile && (
        <p>oops! no profile</p>
      )}
    </section>
  );
};

export { Profiles };
