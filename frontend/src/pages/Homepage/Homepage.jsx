import { useState } from 'react';
import { Chats } from './Chats/Chats.jsx';
import { Messages } from './Messages/Messages.jsx';

const Homepage = () => {

  const [chatId, setChatId] = useState(null)

  return (
    <>
      <h2>Homepage</h2>
      <Chats setChatId={setChatId} />
      <Messages chatId={chatId} />
    </>
  );
};

export { Homepage };
