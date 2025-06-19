import { useState } from 'react';
import { useUsers } from '../../../hooks/useUsers.js';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';

const CreateChat = () => {
  const { users, loading: loadingUsers, error: errorUsers } = useUsers();
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
      console.log(newChat);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      {errorUsers && <h2>{errorUsers}</h2>}
      {loadingUsers && <h2>loading users</h2>}
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
    </section>
  );
};

export { CreateChat };
