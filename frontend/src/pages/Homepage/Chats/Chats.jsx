import { useState } from 'react';
import { useChats } from '../../../hooks/useChats.js';
import { useUsers } from '../../../hooks/useUsers.js';

const Chats = () => {
  const { chats, loading, error } = useChats();
  const { users, loading: loadingUsers, error: errorUsers } = useUsers();
  const [showCreateChat, setShowCreateChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <section>
      <h2>chats</h2>
      <button onClick={() => setShowCreateChat(!showCreateChat)}>
        Create new chat
      </button>
      {error && <h2>{error}</h2>}
      {loading && <h2>loading</h2>}
      {showCreateChat && (
        <form>
          <select
            name="users"
            id="users"
            defaultValue=""
            onChange={(event) => setSelectedUser(event.target.value)}
          >
            <option value="" disabled>
              Select user
            </option>
            {users &&
              users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
          </select>
          <button>Submit</button>
        </form>
      )}
      {chats && (
        <ul>
          {chats.map((chat) => (
            <li key={chat.id}>
              <div>{chat.id}</div>
              {chat.users.map((user) => (
                <div key={user.id}>{user.username}</div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export { Chats };
