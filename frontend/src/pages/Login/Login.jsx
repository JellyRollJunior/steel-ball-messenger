import { useState } from 'react';
import { makeRequest } from '../../utils/requests.js';
import { getUrl } from '../../utils/serverUrl.js';
import { FullPageForm } from '../../components/FullPageForm/FullPageForm.jsx';
import { Link, useNavigate } from 'react-router';
import shared from '../../styles/shared.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = await makeRequest(getUrl('/login'), {
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
      localStorage.setItem('token', data.token);
      setTimeout(() => {
        // show everyone my pro loading animation!
        setIsLoading(false);
        navigate('/');
      }, 2000);
    } catch {
      setTimeout(() => {
        setIsLoading(false);
        setError('Unable to authenticate user.');
      }, 2000);
    }
  };

  return (
    <FullPageForm onSubmit={submitLogin} error={error} isLoading={isLoading}>
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
      <div className={shared.marginTopLarge}>
        <button className={shared.primaryButton}>Log In</button>
        <Link to="/signup">
          <button type="button" className={`${shared.secondaryButton}`}>
            Sign Up
          </button>
        </Link>
      </div>
    </FullPageForm>
  );
};

export { Login };
