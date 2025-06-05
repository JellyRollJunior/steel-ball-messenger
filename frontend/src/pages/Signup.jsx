import { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const submitSignup = async (event) => {
    event.preventDefault();
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
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        on={(event) => setPassword(event.target.value)}
        minLength={6}
        maxLength={24}
      />
      <button>Submit</button>
    </form>
  );
};

export { Signup };
