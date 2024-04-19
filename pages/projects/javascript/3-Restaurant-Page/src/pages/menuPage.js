let main = document.querySelector('main');

function renderMenuPage() {
    let pageStructure = `
    <div class='align-title-left'>
        <div class='menuTitleContainer'>
            <p class='dashesH1'>////////</p>
            <h1 class='solidH1'>OUR</h1>
            <h1 class='redOutline'>MENU</h1>
        </div>
  
        <div class='menuItemContainer'>
            <div class='menuSection'>
                <div>
                    <h3>Starters</h3>
                    <ul>
                        <li>
                            <p>Crispy Onion Rings</p>
                            <div></div>
                            <p>£3.00</p>
                        </li>
                        <li>
                            <p>Mozzarella Sticks</p>
                            <div></div>
                            <p>£4.50</p>
                        </li>
                        <li>
                            <p>Loaded Potato Skins</p>
                            <div></div>
                            <p>£3.50</p>
                        </li>
                        <li>
                            <p>Buffalo Chicken Wings</p>
                            <div></div>
                            <p>£5.00</p>
                        </li>
                        <li>
                            <p>Fried Pickles</p>
                            <div></div>
                            <p>£2.00</p>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3>Sides</h3>
                    <ul>
                        <li>
                            <p>French Fries</p>
                            <div></div>
                            <p>£4.00</p>
                        </li>
                        <li>
                            <p>Sweet Potato Fries</p>
                            <div></div>
                            <p>£4.50</p>
                        </li>
                        <li>
                            <p>Onion Rings</p>
                            <div></div>
                            <p>£2.00</p>
                        </li>
                        <li>
                            <p>Coleslaw</p>
                            <div></div>
                            <p>£2.00</p>
                        </li>
                        <li>
                            <p>Loaded Nachos</p>
                            <div></div>
                            <p>£3.50</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div class='menuSection'>
                <div>
                    <h3>Burgers</h3>
                    <ul>
                        <li>
                            <p>Classic Cheeseburger</p>
                            <div></div>
                            <p>£12.50</p>
                        </li>
                        <li>
                            <p>BBQ Bacon Burger</p>
                            <div></div>
                            <p>£11.50</p>
                        </li>
                        <li>
                            <p>Oppenheimer's Burger</p>
                            <div></div>
                            <p>£10.50</p>
                        </li>
                        <li>
                            <p>Spicy Jalapeño Burger</p>
                            <div></div>
                            <p>£13.50</p>
                        </li>
                        <li>
                            <p>Veggie Burger</p>
                            <div></div>
                            <p>£12.50</p>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3>Drinks</h3>
                    <ul>
                        <li>
                            <p>Classic Milkshake</p>
                            <div></div>
                            <p>£2.50</p>
                        </li>
                        <li>
                            <p>Craft Soda</p>
                            <div></div>
                            <p>£3.50</p>
                        </li>
                        <li>
                            <p>Fresh Lemonade</p>
                            <div></div>
                            <p>£1.50</p>
                        </li>
                        <li>
                            <p>Iced Tea</p>
                            <div></div>
                            <p>£2.50</p>
                        </li>
                        <li>
                            <p>Fruit Smoothies</p>
                            <div></div>
                            <p>£2.50</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <p class='bottomP'>
            If you have any allergies please let one of our members of staff know.
        </p>
    </div>
    `

    main.insertAdjacentHTML( 'beforeend', pageStructure );
}

export { renderMenuPage }