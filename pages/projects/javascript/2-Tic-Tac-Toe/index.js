const boardContainer = document.getElementById('boardContainer');
const dialog = document.querySelector('dialog');
const changeModeBtn = document.getElementById('changeModeBtn')
const pvpBtn = document.getElementById('pvpBtn');
const aiBtn = document.getElementById('aiBtn');
const form = document.querySelector('form');
const statusP = document.getElementById('statusP');
const scoreOne = document.getElementById('scoreOne');
const scoreTwo = document.getElementById('scoreTwo');

changeModeBtn.addEventListener("click", () => {
    dialog.showModal();
});

pvpBtn.addEventListener("click", () => {
    GAME_CONTROLLER.setMode('pvp');
    dialog.close();
});

aiBtn.addEventListener("click", () => {
    GAME_CONTROLLER.setMode('ai');
    dialog.close();
});

const GAME_CONTROLLER = (function() {
    let currentPlayer = 0;
    let playerOneSymbol = 'X';
    let playerTwoSymbol = 'O';
    let playAgainstAI = false;
    let gameOver = false;
    const players = [
        {
            name: 'Player One',
            score: 0
        },
        {
            name: 'Player Two',
            score: 0
        }
    ];

    const resetPlayersArr = () => {
        players[0].score = 0;
        players[1].score = 0;
    }

    const getGameState = () => {
        if (gameOver) {
            return true;
        }
        else return false;
    }

    const updateGameState = () => {
        if(BOARD_CONTROLLER.checkForWin()){
            statusP.innerHTML = `${players[currentPlayer].name} wins!`;
            gameOver = true;
            players[currentPlayer].score++;
            DISPLAY_CONTROLLER.playPAnimation();
            DISPLAY_CONTROLLER.highlightWinGrid(BOARD_CONTROLLER.getWinGridArray());
            DISPLAY_CONTROLLER.updateScoreDisplay(players[0].name, players[1].name, players[0].score, players[1].score);
        }
        else if(BOARD_CONTROLLER.checkForTie()) {
            statusP.innerHTML = `It's a tie!`;
            gameOver = true;
            DISPLAY_CONTROLLER.playPAnimation();
        }
    }

    const getCurrentSymbol = () => {
        if (currentPlayer == 0) {
            return playerOneSymbol;
        }
        else return playerTwoSymbol;
    }

    const swapCurrentPlayer = () => {
        if (!getGameState()) {
            if (currentPlayer == 0) {
                currentPlayer = 1;
                if (playAgainstAI) {
                    AI_CONTROLLER.aiAddSymbol();
                    currentPlayer = 0;
                } 
                else {
                    statusP.innerHTML = `${players[currentPlayer].name}'s turn`;
                    DISPLAY_CONTROLLER.playPAnimation();
                }
            }
            else {
                currentPlayer = 0;
                statusP.innerHTML = `${players[currentPlayer].name}'s turn`;
                DISPLAY_CONTROLLER.playPAnimation();
            }
        }
    }

    const resetGame = () => {
        currentPlayer = 0;
        gameOver = false;
        BOARD_CONTROLLER.clearBoard();
        DISPLAY_CONTROLLER.resetDisplay();
        DISPLAY_CONTROLLER.playPAnimation();
        statusP.innerHTML = `${players[currentPlayer].name}'s turn`;
    }

    const setMode = (mode) => {
        players[0].name = document.getElementById('playerOneName').value == '' ? 'Player One' : document.getElementById('playerOneName').value;
        if (mode == 'pvp') {
            playAgainstAI = false;
            players[1].name = document.getElementById('playerTwoName').value == '' ? 'Player Two' : document.getElementById('playerTwoName').value;
        }
        else {
            playAgainstAI = true;
            players[1].name = 'AI';
        }
        resetGame();
        resetPlayersArr();
        DISPLAY_CONTROLLER.updateScoreDisplay(players[0].name, players[1].name, players[0].score, players[1].score);
    }

    return {getGameState, updateGameState, getCurrentSymbol, swapCurrentPlayer, resetGame, setMode};
})();

const BOARD_CONTROLLER = (function () {
    let gameboard = [null, null, null, null, null, null, null, null, null];

    const setupBoard = () => {
        for (let i = 0; i < 9; i++) {
            let tempNewDiv = document.createElement('div');
            tempNewDiv.setAttribute('id', i);
            tempNewDiv.addEventListener('click', function(){PLAYER_CONTROLLER.playerAddSymbol(tempNewDiv.id)})
            boardContainer.appendChild(tempNewDiv);
        }
    }

    const clearBoard = () => {
        gameboard = [null, null, null, null, null, null, null, null, null];
    }

    const checkIfGridIsClear = (index) => {
        if (gameboard[index] !== null) {
            return false;
        }
        else return true;
    }

    const addSymbol = (index) => {
        gameboard[index] = GAME_CONTROLLER.getCurrentSymbol();
        DISPLAY_CONTROLLER.addSymbolDisplay(index);
        GAME_CONTROLLER.updateGameState();
        GAME_CONTROLLER.swapCurrentPlayer();
    }

    let gridsFound = 0
    const checkForWin = () => {
        const WINNING_COMBINATIONS = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                gridsFound = combination;
                return document.getElementById(index).classList.contains(GAME_CONTROLLER.getCurrentSymbol())
            })
        })
    }

    const checkForTie = () => {
        let isTie = true;
        for (let i = 0; i < 9; i++) {
            if (gameboard[i] === null) {
                isTie = false;
            }
        }
        return isTie;
    }

    const getWinGridArray = () => {
        return gridsFound;
    }

    return{setupBoard, clearBoard, checkForWin, getWinGridArray, checkIfGridIsClear, checkForTie, addSymbol};
})();

const DISPLAY_CONTROLLER = (function () {
    const addSymbolDisplay = (index) => {
        let targetGrid = document.getElementById(index);
        targetGrid.classList.add(GAME_CONTROLLER.getCurrentSymbol());
    }

    const highlightWinGrid = (indexArr) => {
        for (let i = 0; i < 3; i++) {
            document.getElementById(indexArr[i]).style.backgroundColor = 'red';
        }
    }

    const updateScoreDisplay = (playerOneName, playerTwoName, scoreOneValue, scoreTwoValue) => {
        scoreOne.innerHTML = `${playerOneName}: ${scoreOneValue}`;
        scoreTwo.innerHTML = `${playerTwoName}: ${scoreTwoValue}`;
    }

    const resetDisplay = () => {
        for (let i = 0; i < 9; i++) {
            document.getElementById(i).className = "";
            document.getElementById(i).removeAttribute('style');
        }
    }

    const playPAnimation = () => {
        statusP.style.animation = 'none';
        statusP.offsetHeight;
        statusP.style.animation = null; 
        statusP.style.animation = 'slidein 1s';
    }

    return {addSymbolDisplay, highlightWinGrid, updateScoreDisplay, resetDisplay, playPAnimation};
})();

const PLAYER_CONTROLLER = (function () {
    const playerAddSymbol = (index) => {
        if (BOARD_CONTROLLER.checkIfGridIsClear(index) && GAME_CONTROLLER.getGameState() == false) {
            BOARD_CONTROLLER.addSymbol(index);
        }
    }

    return{playerAddSymbol};
})();

const AI_CONTROLLER = (function () {
    const aiAddSymbol = () => {
        let randIndex = Math.floor(Math.random() * 9);
        if (BOARD_CONTROLLER.checkIfGridIsClear(randIndex)) {
            BOARD_CONTROLLER.addSymbol(randIndex);
        }
        else if(GAME_CONTROLLER.getGameState() == false) aiAddSymbol();
    }

    return {aiAddSymbol};
})();

//Start the game
dialog.showModal();
BOARD_CONTROLLER.setupBoard();