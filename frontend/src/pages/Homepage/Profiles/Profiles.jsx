import { useProfiles } from '../../../hooks/useProfiles.js';
import { EditProfile } from '../EditProfile/EditProfile.jsx';

const Profiles = ({ userId }) => {
  const { profile, isLoading, error, setProfile } = useProfiles(userId);

  if (!userId) return null;

  return (
    <section>
      {error && <h2>{error}</h2>}
      {isLoading && <h2>loading chats</h2>}
      <h2>Profiles</h2>
      {profile && profile.bio && (
        <>
          <h3>{profile.username}</h3>
          <p>{profile.bio}</p>
          <EditProfile
            profileUserId={userId}
            userBio={profile.bio}
            setProfile={setProfile}
          />
        </>
      )}
      {!profile && <p>oops! no profile</p>}
    </section>
  );
};

export { Profiles };
