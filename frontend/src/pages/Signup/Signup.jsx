import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ToastContext } from '../../providers/ToastContext/ToastContext.jsx';
import { makeRequest } from '../../utils/requests.js';
import { getUrl } from '../../utils/serverUrl.js';
import { FullPageForm } from '../../components/FullPageForm/FullPageForm.jsx';
import shared from '../../styles/shared.module.css';
import diego from '../../assets/backgroundImages/diego-world.png';

const Signup = () => {
  const navigate = useNavigate();
  const { createToast } = useContext(ToastContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (password != passwordConfirm) {
      createToast('Passwords do not match.');
      return;
    }
    try {
      await makeRequest(getUrl('/users'), {
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
      setTimeout(() => {
        setIsLoading(false);
        navigate('/login');
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
        if (error.validationErrors) {
          error.validationErrors.forEach((error) => {
            createToast(error.msg, true);
          })
        } else {
          createToast(error.message, true)
        }
      }, 2000);
    }
  };

  return (
    <FullPageForm onSubmit={submitSignup} isLoading={isLoading} backgroundImage={diego}>
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
