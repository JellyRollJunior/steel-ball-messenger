import valentine from '../../assets/backgroundImages/funny-valentine.jpg';
import gyro from '../../assets/backgroundImages/gyro-headshot.png';
import johnny from '../../assets/backgroundImages/johnny-joestar.jpg';
import steelBall from '../../assets/images/steel-ball.png';
import tusk from '../../assets/images/tusk.png';
import steelBallRun from '../../assets/images/SBR.png';

const pages = Object.freeze({
    CHATS: {
        name: 'Chats',
        icon: steelBall,
        backgroundImage: gyro,
        isNav: true,
    },
    NEWCHAT: {
        name: 'New Chat',
        icon: steelBallRun,
        backgroundImage: valentine,
        isNav: true,
    },
    PROFILE: {
        name: 'Profile',
        icon: tusk,
        backgroundImage: johnny,
        isNav: true,
    },
    MESSAGES: {
        name: 'Messages',
        isNav: false,
    },
    CHATTERPROFILE: {
        name: 'Chatter Profile',
        isNav: false,
    }
});

export { pages };
