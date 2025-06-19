import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../providers/UserContext/UserContext.jsx';
import { makeRequest } from '../../utils/requests.js';
import { getUrl } from '../../utils/serverUrl.js';
import { Chats } from './Chats/Chats.jsx';
import { Messages } from './Messages/Messages.jsx';
import { Profiles } from './Profiles/Profiles.jsx';

const Homepage = () => {
  const [chatId, setChatId] = useState(null);
  const [userProfileId, setUserProfileId] = useState(null);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await makeRequest(getUrl('/current'), {
          mode: 'cors',
          method: 'GET',
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setUser(data.id, data.username, data.bio);
        return data;
      } catch (error) {
        console.log(error)
        // todo: throw notification if error
      }
    };

    fetchUser();
  }, [setUser]);

  return (
    <>
      <Chats setChatId={setChatId} />
      <Messages chatId={chatId} setUserProfileId={setUserProfileId} />
      <Profiles userId={userProfileId} />
    </>
  );
};

export { Homepage };
