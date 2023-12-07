const rockBtn = document.getElementById('rockBtn');
const paperBtn = document.getElementById('paperBtn');
const scissorsBtn = document.getElementById('scissorsBtn');

const playerScoreE = document.getElementById('playerScore');
const aiScoreE = document.getElementById('aiScore');
const resultDiv = document.getElementById('result');
const playAgainBtn = document.getElementById('playAgain');

let playerScore = 0;
let aiScore = 0;
let roundOver = false;

function getAiChoice() {
    let randNum = Math.ceil(Math.random() * 3);
    switch (randNum) {
        case 1:
            return 'Rock';
            break;
        case 2:
            return 'Paper';
            break;
        case 3:
            return 'Scissors';
        default:
            break;
    }
}

function playRound(playerChoice, aiChoice) {
    if(!roundOver){
        if (playerChoice == 'Rock' && aiChoice == 'Scissors' ||
            playerChoice == 'Paper' && aiChoice == 'Rock' ||
            playerChoice == 'Scissors' && aiChoice == 'Paper') {
            resultDiv.textContent = `${playerChoice} beats ${aiChoice}! Player gets a point!`;
            playerScore++;
        }
        else if(playerChoice == 'Rock' && aiChoice == 'Paper' ||
            playerChoice == 'Paper' && aiChoice == 'Scissors' ||
            playerChoice == 'Scissors' && aiChoice == 'Rock') {
            resultDiv.textContent = `${aiChoice} beats ${playerChoice}! AI gets a point!`;
            aiScore++;
        }
        else if(playerChoice == aiChoice) {
            resultDiv.textContent = `It's a tie!`
        }
        updateScore();
        checkRoundStatus();
    }
}

function updateScore() {
    playerScoreE.textContent = playerScore;
    aiScoreE.textContent = aiScore;
}

function checkRoundStatus() {
    if(playerScore >= 5){
        resultDiv.textContent = `You win!`
        playAgainBtn.classList.remove('hidden');
        playAgainBtn.classList.add('unhidden');
        roundOver = true;
    }
    else if(aiScore >= 5){
        resultDiv.textContent = `You lose!`
        playAgainBtn.classList.remove('hidden');
        playAgainBtn.classList.add('unhidden');
        roundOver = true;
    }
}

function restartRound() {
    if (roundOver) {
        playerScore = 0;
        aiScore = 0;
        roundOver = false;
        updateScore();
        resultDiv.textContent = '';
        playAgainBtn.classList.add('hidden');
        playAgainBtn.classList.remove('unhidden');
    }
}

rockBtn.addEventListener('click', function(){
    playRound('Rock', getAiChoice());
});

paperBtn.addEventListener('click', function(){
    playRound('Paper', getAiChoice());
});

scissorsBtn.addEventListener('click', function(){
    playRound('Scissors', getAiChoice());
});

playAgainBtn.addEventListener('click', () => {
    restartRound()
});