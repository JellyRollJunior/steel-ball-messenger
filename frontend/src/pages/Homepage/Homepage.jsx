import { useState } from 'react';
import { Chats } from './Chats/Chats.jsx';
import { Messages } from './Messages/Messages.jsx';
import { Profiles } from './Profiles/Profiles.jsx';

const Homepage = () => {
  const [chatId, setChatId] = useState(null)
  const [userProfileId, setUserProfileId] = useState(null)

  return (
    <>
      <Chats setChatId={setChatId} />
      <Messages chatId={chatId} setUserProfileId={setUserProfileId} />
      <Profiles userId={userProfileId} />
    </>
  );
};

export { Homepage };
