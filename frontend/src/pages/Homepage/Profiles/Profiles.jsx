import { useProfiles } from '../../../hooks/useProfiles.js';
import { EditProfile } from '../EditProfile/EditProfile.jsx';

const Profiles = ({ userId }) => {
  const { profile, isLoading, error } = useProfiles(userId);

  if (!userId) return null;

  return (
    <section>
      {error && <h2>{error}</h2>}
      {isLoading && <h2>loading chats</h2>}
      <h2>Profiles</h2>
      {profile && profile.bio && (
        <p>
          {profile.bio}
        </p>
      )}
      {!profile && (
        <p>oops! no profile</p>
      )}
      <EditProfile profileUserId={userId} />
    </section>
  );
};

export { Profiles };
