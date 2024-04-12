import { addImages } from "./imageLoader";
import { renderHomePage } from "./pages/homePage";
import { renderMenuPage } from "./pages/menuPage";
import { renderAboutPage } from "./pages/aboutPage";

import "./styles/mainStyles.css";
import "./styles/mainBackgroundSvg.css";
import "./styles/homepageStyles.css";

document.getElementById('homeBtn').addEventListener('click', function() {swapTab('Home')});
document.getElementById('menuBtn').addEventListener('click', function() {swapTab('Menu')});
document.getElementById('aboutBtn').addEventListener('click', function() {swapTab('About')});

let currentTab = 'Home';
let canSwap = true;
let delayInMilliseconds = 500;
let delayInMillisecondsTwo = 1000;
let transitionDiv = document.getElementById('transitionDiv');

function playTransition() {
    transitionDiv.style.animation = 'none';
    transitionDiv.offsetHeight;
    transitionDiv.style.animation = null; 
    transitionDiv.style.animation = 'slidein 1s ease-in-out';
}

function swapTab(tab) {
    if (tab !== currentTab && canSwap) {
        currentTab = tab;
        canSwap = false;
        playTransition();
        document.querySelector('.active').classList.remove('active');
        switch (tab) {
            case 'Home':
                document.getElementById('homeBtn').classList.add('active');
                break;
            case 'Menu':
                document.getElementById('menuBtn').classList.add('active');
                break;
            case 'About':
                document.getElementById('aboutBtn').classList.add('active');
                break;
        }
        setTimeout(function() {
            document.querySelector('main').innerHTML = '';
            switch (tab) {
                case 'Home':
                    renderHomePage();
                    break;
                case 'Menu':
                    renderMenuPage();
                    break;
                case 'About':
                    renderAboutPage();
                    break;
            }
        }, delayInMilliseconds);
        setTimeout(function() {
            canSwap = true;
        }, delayInMillisecondsTwo);
    }
}

addImages();
renderHomePage();