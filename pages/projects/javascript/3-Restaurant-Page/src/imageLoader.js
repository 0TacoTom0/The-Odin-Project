import './styles/mainStyles.css';
import './styles/mainBackgroundSvg.css';

import HomeLogo from './svg/home.svg';
import MenuLogo from './svg/menu.svg';
import AboutLogo from './svg/about.svg';

import BurgerLogo from './svg/burger-logo.svg';
import SnapchatLogo from './svg/snapchat.svg';
import InstagramLogo from './svg/instagram.svg';
import FacebookLogo from './svg/facebook.svg';
import TwitterLogo from './svg/twitter.svg';



function addImages(){
    document.getElementById('homeSvg').setAttribute('src', HomeLogo);
    document.getElementById('menuSvg').setAttribute('src', MenuLogo);
    document.getElementById('aboutSvg').setAttribute('src', AboutLogo);
    
    document.getElementById('navbarLogo').setAttribute('src', BurgerLogo);
    document.getElementById('snapchat').setAttribute('src', SnapchatLogo);
    document.getElementById('instagram').setAttribute('src', InstagramLogo);
    document.getElementById('facebook').setAttribute('src', FacebookLogo);
    document.getElementById('twitter').setAttribute('src', TwitterLogo);
}

export{ addImages };