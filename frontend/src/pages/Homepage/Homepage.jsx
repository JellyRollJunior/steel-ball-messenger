import { useContext, useEffect } from 'react';
import { UserContext } from '../../providers/UserContext/UserContext.jsx';
import { makeRequest } from '../../utils/requests.js';
import { getUrl } from '../../utils/serverUrl.js';
import { Chats } from './Chats/Chats.jsx';
import styles from './Homepage.module.css';
import shared from '../../styles/shared.module.css';
import { IconButton } from '../../components/IconButton/IconButton.jsx';
import steelBall from '../../assets/images/steel-ball.png';


const Homepage = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await makeRequest(getUrl('/current'), {
          mode: 'cors',
          method: 'GET',
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setUser(data.id, data.username, data.bio);
        return data;
      } catch (error) {
        console.log(error);
        // todo: throw notification if error
      }
    };

    fetchUser();
  }, [setUser]);

  return (
    <>
      <div className={`${styles.pageLayout} ${shared.background}`}>
        <Chats />
        <nav className={`${styles.nav} ${shared.card}`}>
          <IconButton icon={steelBall} size={56}/>
          <IconButton icon={steelBall} size={56}/>
          <IconButton icon={steelBall} size={56}/>
        </nav>
      </div>
    </>
  );
};

export { Homepage };
