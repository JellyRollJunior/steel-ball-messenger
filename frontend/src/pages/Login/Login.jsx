import { useContext, useState } from 'react';
import { UserContext } from '../../providers/UserContext/UserContext.jsx';
import { makeRequest } from '../../utils/requests.js';
import { getUrl } from '../../utils/serverUrl.js';
import { Link } from 'react-router';
import styles from './Login.module.css';
import shared from '../../styles/shared.module.css';
import steelBall from '../../assets/images/steel-ball.png';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submitLogin = async (event) => {
    event.preventDefault();
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
      setUser(data.id, data.username);
    } catch (error) {
      console.log(error);
      setError('Unable to authenticate user.');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <main className={`${shared.formWrapper} ${shared.card}`}>
        <img
          className={shared.formImage}
          src={steelBall}
          alt="Gyro's green steel ball"
        />
        <h1 className={shared.formTitle}>
          <i>S.B.M</i>
          <br />
          <span>Steel Ball Messenger</span>
        </h1>
        <form onSubmit={submitLogin} className={shared.form}>
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
          <div className={shared.marginTopLarge}>
            <button className={shared.primaryButton}>Log In</button>
            <Link to="/signup">
              <button type="button" className={`${shared.secondaryButton}`}>
                Sign Up
              </button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export { Login };
