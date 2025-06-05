import { useState } from 'react';
import { makeRequest } from '../utils/requests.js';
import { getUrl } from '../utils/serverUrl.js';

const Signup = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState([]);

  const submitSignup = async (event) => {
    event.preventDefault();
    try {
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
    } catch (error) {
      if (error.validationErrors) {
        setErrors(error.validationErrors);
      } else {
        setErrors([{ msg: error.message }]);
      }
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitSignup}>
      {errors.map((error) => (
        <h3 key={error.msg}>{error.msg}</h3>
      ))}
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
      />
      <button>Submit</button>
    </form>
  );
};

export { Signup };
