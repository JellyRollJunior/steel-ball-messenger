import { useState } from 'react';
import { useChats } from '../../../hooks/useChats.js';
import { useUsers } from '../../../hooks/useUsers.js';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';

const Chats = ({ setChatId }) => {
  const { chats, loading, error, refetch: refetchChats } = useChats();
  const { users, loading: loadingUsers, error: errorUsers } = useUsers();
  const [showCreateChat, setShowCreateChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const createChat = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formatUser = [{ id: Number(selectedUser) }];
      const newChat = await makeRequest(getUrl('/chats'), {
        mode: 'cors',
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          users: formatUser,
        }),
      });
      refetchChats();
      console.log(newChat);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h2>chats</h2>
      <button onClick={() => setShowCreateChat(!showCreateChat)}>
        Create new chat
      </button>
      {error && <h2>{error}</h2>}
      {loading && <h2>loading chats</h2>}
      {errorUsers && <h2>{errorUsers}</h2>}
      {loadingUsers && <h2>loading users</h2>}
      {showCreateChat && (
        <form onSubmit={createChat}>
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
              <button onClick={() => setChatId(chat.id)}>Show messages</button>
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
