import { useState } from 'react';
import { makeRequest } from '../utils/requests.js';
import { getUrl } from '../utils/serverUrl.js';

const Signup = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const submitSignup = async (event) => {
    event.preventDefault();
    const user = await makeRequest(getUrl('/users'), {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    console.log(user);
  };

  return (
    <form onSubmit={submitSignup}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        minLength={6}
        maxLength={24}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        minLength={6}
        maxLength={24}
        required
      />
      <button>Submit</button>
    </form>
  );
};

export { Signup };
