var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');

var wordBank = ['Drowsy', 'Somnolent', 'Tired', 'Languorous', 'Lethargic'];
var wins = 0;
var losses = 0;
var guessesLeft = 7;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

function newGame() {
    gameRunning = true;
    guessesLeft = 7;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];

pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

for (var i = 0; i < pickedWord.length; i++) {
    if (pickedWord[i] === ' ') {
        pickedWordPlaceholderArr.push(' ');
    }   else {
        pickedWordPlaceholderArr.push('_');
    }
}

$guessesLeft.textContent = guessesLeft;
$placeholders.textContent = pickedWordPlaceholderArr.join('');
$guessedLetters.textContent = incorrectLetterBank;
}

function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        guessedLetterBank.push(letter);
        for (var i = 0; i < pickedWord.length; i++) {
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                
                pickedWordPlaceholderArr[i] = pickedWord[i];
            }
        }
        console.log(pickedWordPlaceholderArr)
        $placeholders.textContent = pickedWordPlaceholderArr.join(' ');
        checkIncorrect(letter);

    }
    else {
        if (gameRunning === false) {
            alert("Play new game.");
        } else {
            alert("You've already guessed this letter, try a new one!");
        }
    }
}

function checkIncorrect(letter) {

    if (
        pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 &&
    pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1) {
        guessesLeft--;
        incorrectLetterBank.push(letter);
        $guessedLetters.textContent = incorrectLetterBank.join(' ');
        $guessesLeft.textContent = guessesLeft; 
    }
    checkLoss();
}

function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent = pickedWord;
    }
    checkWin();
}

function checkWin() {
    if (pickedWord.toLocaleLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase())
    {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
    }
}

$newGameButton.addEventListener('click', newGame);

document.onkeyup = function(event) {
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}