import { useProfiles } from '../../../hooks/useProfiles.js';

const Profiles = ({ userId = 22 }) => {
  const { profile, isLoading, error } = useProfiles(userId);

  if (!userId) return null;

  return (
    <section>
      {error && <h2>{error}</h2>}
      {isLoading && <h2>loading chats</h2>}
      <h2>Profiles</h2>
      {profile && (
        <p>
          {profile.bio}
        </p>
      )}
    </section>
  );
};

export { Profiles };
