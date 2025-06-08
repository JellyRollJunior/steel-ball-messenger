import { useState } from 'react';
import { useChats } from '../../../hooks/useChats.js';

const Chats = () => {
  const { chats, loading, error } = useChats();
  const [showCreateChat, setShowCreateChat] = useState(false);

  return (
    <section>
      <h2>chats</h2>
      <button onClick={() => setShowCreateChat(!showCreateChat)}>
        Create new chat
      </button>
      {error && <h2>{error}</h2>}
      {loading && <h2>loading</h2>}
      {chats && (
        <ul>
          {chats.map((chat) => (
            <li>
              <div>{chat.id}</div>
              {chat.users.map((user) => (
                <div>{user.username}</div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export { Chats };
