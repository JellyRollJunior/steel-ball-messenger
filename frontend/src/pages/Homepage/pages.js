import valentine from '../../assets/backgroundImages/funny-valentine.jpg';
import gyro from '../../assets/backgroundImages/gyro-headshot.png';
import johnny from '../../assets/backgroundImages/johnny-joestar.jpg';
import steelBall from '../../assets/images/steel-ball.png';
import tusk from '../../assets/images/tusk.png';
import steelBallRun from '../../assets/images/SBR.png';

const pages = Object.freeze({
  CHATS: { name: 'Chats', icon: steelBall, backgroundImage: gyro },
  NEWCHAT: { name: 'New Chat', icon: steelBallRun, backgroundImage: valentine },
  PROFILE: { name: 'Profile', icon: tusk, backgroundImage: johnny  },
});

export { pages}