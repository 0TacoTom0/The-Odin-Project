let main = document.querySelector('main');

function renderHomePage() {
    let pageStructure = `
    <div class='homeTitleContainer'>
        <p class='dashesH1'>////////</p>
        <h1 class='solidH1'>WE MAKE</h1>
        <h1 class='redOutline'>BURGERS</h1>
        <img class='underImage' src='../src/images/h1UnderImage.png'>
    </div>

    <div class='mainHomeContainer'>
        <div class='homeTextContainer'>
            <h2>Who are we?</h2>
            <p>This isn't your run-of-the-mill burger restaurant. We offer a unique experience where every burger is a masterpiece crafted with passion and precision. Nestled in the heart of the city, our restaurant is a haven for burger aficionados seeking culinary excellence.<br><br>
            At Unreal Burgers, we believe in the art of burger making, using only the finest quality ingredients sourced locally to ensure freshness and flavour. From juicy, hand-formed patties to artisanal brioche buns, every element of our burgers is meticulously selected to guarantee a taste sensation like no other.<br><br>
            <b>So what are you waiting for?</b></p>
        </div>
        <div class='homeImageContainer'>
            <img src=../src/images/homeImage.png>
        </div>
    </div>

    <div class="scrolling_text">
        <div class="text">
            <span>BURGERS</span>
            <span>BURGERS</span>
            <span>BURGERS</span>
            <span>BURGERS</span>
            <span>BURGERS</span>
        </div>
        <div class="text">
            <span>BURGERS</span>
            <span>BURGERS</span>
            <span>BURGERS</span>
            <span>BURGERS</span>
            <span>BURGERS</span>
        </div>
    </div>
    `

    main.insertAdjacentHTML( 'beforeend', pageStructure );
}

export { renderHomePage }