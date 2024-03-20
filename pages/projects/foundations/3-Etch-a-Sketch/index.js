function randomNum() {return Math.floor(Math.random() * 256)};

function changeColour(elem, colour){
    if(colour == 'clear') {elem.style.backgroundColor = 'white';}
    else if(currentColour == 'rainbow' && mouseDown){
        elem.style.backgroundColor = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
    }
    else if(mouseDown) {elem.style.backgroundColor = colour};
}

function changeColourClicked(elem, colour){
    if(currentColour == 'rainbow'){
        elem.style.backgroundColor = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
    }
    else {elem.style.backgroundColor = colour};
}

function setCurrentColour(elem) {currentColour = elem.value};

function clearCanvas() {
    for (let i = 1; i <= size*size; i++) {
        let block = document.getElementById(i);
        changeColour(block, 'clear');
    }
}

function fillCanvas() {
    for (let i = 1; i <= size*size; i++) {
        let block = document.getElementById(i);
        changeColourClicked(block, currentColour);
    }
}

function setupCanvas() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    for (let i = 1; i <= size*size; i++) {
        let newDiv = document.createElement('div');
        newDiv.setAttribute('id', i);
        newDiv.classList.add('blockDiv');
        newDiv.addEventListener('mouseover', () => {changeColour(newDiv, currentColour)});
        newDiv.addEventListener('mousedown', () => {changeColourClicked(newDiv, currentColour)});
        canvas.appendChild(newDiv);
    }
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

//Colour Options
const redBtn = document.getElementById('colourRed');
const orangeBtn = document.getElementById('colourOrange');
const yellowBtn = document.getElementById('colourYellow');
const greenBtn = document.getElementById('colourGreen');
const blueBtn = document.getElementById('colourBlue');
const indegoBtn = document.getElementById('colourIndego');
const violetBtn = document.getElementById('colourViolet');
const blackBtn = document.getElementById('colourBlack');

redBtn.addEventListener('click', () => {setCurrentColour(redBtn)});
orangeBtn.addEventListener('click', () => {setCurrentColour(orangeBtn)});
yellowBtn.addEventListener('click', () => {setCurrentColour(yellowBtn)});
greenBtn.addEventListener('click', () => {setCurrentColour(greenBtn)});
blueBtn.addEventListener('click', () => {setCurrentColour(blueBtn)});
indegoBtn.addEventListener('click', () => {setCurrentColour(indegoBtn)});
violetBtn.addEventListener('click', () => {setCurrentColour(violetBtn)});
blackBtn.addEventListener('click', () => {setCurrentColour(blackBtn)});


//Button Setting
const eraserBtn = document.getElementById('eraserBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const fillBtn = document.getElementById('fillBtn');
const clearBtn = document.getElementById('clearBtn');

eraserBtn.addEventListener('click', () => {setCurrentColour(eraserBtn)});
rainbowBtn.addEventListener('click', () => {setCurrentColour(rainbowBtn)});
fillBtn.addEventListener('click', () => {fillCanvas()});
clearBtn.addEventListener('click', () => {clearCanvas()});


//Slider Setting
const slider = document.getElementById('sizeSlider');
const sizeText = document.getElementById('sizeText');

slider.onchange = function() {
    size = this.value;
    setupCanvas();
}

slider.oninput = function() {
    sizeText.textContent = `${this.value} x ${this.value}`;
}

//Mouse Events
window.addEventListener('mousedown', () => {mouseDown = true});
window.addEventListener('mouseup', () => {mouseDown = false});

//Initialise
const canvas = document.getElementById('canvasContainer');

let size = 10;
let currentColour = 'black';
let mouseDown = false;

setupCanvas();