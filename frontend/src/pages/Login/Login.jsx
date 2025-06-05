import { useState } from 'react';
import { makeRequest } from '../../utils/requests.js';
import { getUrl } from '../../utils/serverUrl.js';
import { Link } from 'react-router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const submitLogin = async (event) => {
    event.preventDefault();
    try {
      const json = await makeRequest(getUrl('/login'), {
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
      // save token into local storage
      localStorage.setItem('token', json.token);
    } catch (error) {
      console.log(error);
      setError('Unable to authenticate user.');
    }
  };

  return (
    <form onSubmit={submitLogin}>
      {error && <h3>{error}</h3>}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        minLength={1}
        maxLength={36}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        minLength={1}
        maxLength={36}
        required
      />
      <button>Submit</button>
      <Link to="/signup">
        <button type="button">Sign up</button>
      </Link>
    </form>
  );
};

export { Login };
