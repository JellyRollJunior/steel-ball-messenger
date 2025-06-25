import valentine from '../../assets/backgroundImages/funny-valentine.png';
import gyro from '../../assets/backgroundImages/gyro-headshot.png';
import steelBall from '../../assets/images/steel-ball.png';
import tusk from '../../assets/images/tusk.png';
import steelBallRun from '../../assets/images/SBR.png';

const pages = Object.freeze({
  CHATS: { name: 'Chats', icon: steelBall, backgroundImage: gyro },
  NEWCHAT: { name: 'New Chat', icon: steelBallRun, backgroundImage: valentine },
  EDITPROFILE: { name: 'Profile', icon: tusk, backgroundImage: gyro  },
});

export { pages}