const screen = document.getElementById('screen');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const equalsBtn = document.getElementById('equalsBtn');

const numberButtons = document.querySelectorAll('#number-button');
const operatorButtons = document.querySelectorAll('#operator-button');

let numOne = '';
let currentOperator = '';
let numTwo = '';
let textToDisplay = [''];

clearBtn.addEventListener('click', clearScreen);
deleteBtn.addEventListener('click', deleteNumber);
equalsBtn.addEventListener('click', solve);

numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
    button.addEventListener('click', () => useOperator(button.textContent))
)

function appendNumber(number){
    if (currentOperator.length == 0 && (numOne.indexOf('.') == -1 || number != '.')) numOne = numOne + number;
    else if (numTwo.indexOf('.') == -1 || number != '.')numTwo = numTwo + number;
    updateScreen();
}

function deleteNumber(){
    if (currentOperator.length == 0) numOne = numOne.substring(0, numOne.length-1);
    else if (numTwo.length == 0) currentOperator = '';
    else numTwo = numTwo.substring(0, numTwo.length-1);
    updateScreen();
}

function useOperator(operator){
    if (numTwo.length <= 0) currentOperator = operator;
    else if (numTwo.length > 0) {
        solve();
        currentOperator = operator;
    }
    updateScreen();
}

function solve(){
    if (numTwo.length > 0) {
        let answer = 0;
        let tempNumOne = Number(numOne);
        let tempNumTwo = Number(numTwo);

        switch (currentOperator) {
            case '÷':
                clearScreen();
                numOne = tempNumOne / tempNumTwo;
                break;
            case 'x':
                clearScreen();
                numOne = tempNumOne * tempNumTwo;
                break;
            case '-':
                clearScreen();
                numOne = tempNumOne - tempNumTwo;
                break;
            case '+':
                clearScreen();
                numOne = tempNumOne + tempNumTwo;
                break;
        }
        numOne = String(numOne);
        updateScreen();
    }
}

function updateScreen(){
    if (currentOperator.length == 0) textToDisplay = numOne;
    else textToDisplay = [numOne, currentOperator, numTwo].join(" ");
    document.getElementById('screen').innerHTML = textToDisplay;
}

function clearScreen(){
    document.getElementById('screen').innerHTML = '0';
    numOne = '';
    currentOperator = '';
    numTwo = '';
}