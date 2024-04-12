import homeImage from '../images/homeImage.png';
import h1UnderImage from '../images/h1UnderImage.png';

let main = document.querySelector('main');

function renderHomePage() {
    let dashesH1 = document.createElement('p');
    let weMakeH1 = document.createElement('h1');
    let burgersH1 = document.createElement('h1');

    let homeMainContentContainer = document.createElement('div');
    let textContainer = document.createElement('div');
    let imageContainer = document.createElement('div');
    let homeImg = document.createElement('img');
    let underImage = document.createElement('img');
    let h2 = document.createElement('h2');
    let p = document.createElement('p');

    dashesH1.innerHTML = '////////'
    weMakeH1.innerHTML = 'WE MAKE'
    burgersH1.innerHTML = 'BURGERS'

    h2.innerHTML = 'What are we?';
    p.innerHTML = `This isn't your run-of-the-mill burger restaurant. We offer a unique experience where every burger is a masterpiece crafted with passion and precision. Nestled in the heart of the city, our restaurant is a haven for burger aficionados seeking culinary excellence.\n
    At Unreal Burgers, we believe in the art of burger making, using only the finest quality ingredients sourced locally to ensure freshness and flavour. From juicy, hand-formed patties to artisanal brioche buns, every element of our burgers is meticulously selected to guarantee a taste sensation like no other.\n
    <b>So what are you waiting for?</b>`;

    dashesH1.classList.add('dashesH1')
    weMakeH1.classList.add('solidH1');
    burgersH1.classList.add('redOutline');
    homeMainContentContainer.classList.add('mainHomeContainer');
    textContainer.classList.add('homeTextContainer');
    imageContainer.classList.add('homeImageContainer');
    underImage.classList.add('underImage');
    p.classList.add('homeP');

    homeImg.setAttribute('src', homeImage);
    underImage.setAttribute('src', h1UnderImage);

    main.appendChild(dashesH1);
    main.appendChild(weMakeH1);
    main.appendChild(burgersH1);
    main.appendChild(underImage);

    main.appendChild(homeMainContentContainer);
    homeMainContentContainer.appendChild(textContainer);
    homeMainContentContainer.appendChild(imageContainer);
    imageContainer.appendChild(homeImg);
    textContainer.appendChild(h2);
    textContainer.appendChild(p);
}

export { renderHomePage }