let main = document.querySelector('main');

function renderAboutPage() {
    let pageStructure = `
    <div class='homeTitleContainer'>
        <p class='dashesH1About'>////////</p>
        <h1 class='solidH1'>ABOUT</h1>
        <h1 class='redOutline'>US</h1>
        <img class='underImage' src='../src/images/h1UnderImage.png'>
    </div>

    <p class='aboutUsP'>
        At Unreal Burgers, we're obsessed with serving up the most delicious, 
        mouthwatering burgers you've ever tasted. Our story began in 2010 when 
        two burger-loving friends decided to open up a no-frills joint dedicated 
        to their passion for the perfect patty. Over a decade later, that same 
        obsession remains at the heart of everything we do. From our fresh, never-frozen 
        beef patties to our soft buttery buns and premium toppings, every ingredient 
        is hand-picked and treated with an uncompromising eye for quality. Whether 
        you're craving a classic cheeseburger or one of our speciality creations piled 
        high, you can count on Unreal Burgers to take you on a flavour journey you won't 
        soon forget. So pull up a chair and let us treat you to the burger experience 
        you deserve!
    </p>

    <p class='dashesP'>////////</p>
    <img class='aboutImg' src='../src/images/aboutImg.jpg'>
    `

    main.insertAdjacentHTML( 'beforeend', pageStructure );
}

export { renderAboutPage }