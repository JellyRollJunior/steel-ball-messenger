import { useState } from 'react';
import { Link } from 'react-router';
import { makeRequest } from '../../utils/requests.js';
import { getUrl } from '../../utils/serverUrl.js';
import { FullPageForm } from '../../components/FullPageForm/FullPageForm.jsx';
import shared from '../../styles/shared.module.css';
import diego from '../../assets/backgroundImages/diego-world.png';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState([]);

  const submitSignup = async (event) => {
    event.preventDefault();
    if (password != passwordConfirm) {
      setError('Passwords do not match.');
      return;
    }
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
        setError(error.validationErrors);
      } else {
        setError(error.message);
      }
      console.log(error);
    }
  };

  return (
    <FullPageForm onSubmit={submitSignup} error={error} backgroundImage={diego}>
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
      <label htmlFor="passwordConfirm">Confirm Password</label>
      <input
        type="password"
        name="passwordConfirm"
        id="passwordConfirm"
        value={passwordConfirm}
        onChange={(event) => setPasswordConfirm(event.target.value)}
        minLength={6}
        maxLength={24}
        required
      />
      <div className={shared.marginTopLarge}>
        <button className={shared.primaryButton}>Sign Up</button>
        <Link to="/login">
          <button className={shared.secondaryButton}>Return to Login</button>
        </Link>
      </div>
    </FullPageForm>
  );
};

export { Signup };
