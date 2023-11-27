const tilesContainer = document.querySelector(".tiles");
//
const gameContainer = document.getElementById("game");

const startButton = document.getElementById('startButton');

const resteButton = document.getElementById('resetButton');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];



const cards = document.querySelectorAll('.card');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const resetButton = document.querySelector('button');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timer, seconds = 0;
let score = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    score++;
    scoreElement.textContent = score;

    if (score === cards.length / 2) {
        stopTimer();
        displayCongratulations();
    }


    resetBoard();
}
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    stopTimer();
    resetTimer();
    resetScore();
    shuffleCards();
    enableCards();


function resetGame() {
    gameContainer.innerHTML = '';
    createBoard();
    score = 0;
}
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        timerElement.textContent = seconds + "seconds";
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    seconds = 0;
    timerElement.textContent = '0 seconds';
}

function resetScore() {
    score = 0;
    scoreElement.textContent = '0';
}

function shuffleCards() {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
        card.style.order = Math.floor(Math.random() * 100);
    });
}

function enableCards() {
    cards.forEach(card => card.addEventListener('click', flipCard));
}


const colorsPicklist = [...COLORS, ...COLORS];

const tileCount = colorsPicklist.length;

//game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(color){
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", false);

    element.addEventListener("click",()=>{
        const revealed = element.getAttribute("data-revealed");
    
        if(awaitingEndOfMove 
            || revealed === "true"
            || element === activeTile
                ){
                        return;
        }
        

        element.style.backgroundColor = color;
        if(!activeTile){
            activeTile = element;
            return;
        }
        const colorToMatch = activeTile.getAttribute("data-color");
        if(colorToMatch === color){
            activeTile.setAttribute("data-revealed", true)
            awaitingEndOfMove = false;
            activeTile = null;
            revealedCount += 2;

            if (revealedCount === tileCount){
                alert("Game Won!");
            }
            return;
        }
        resetButton.addEventListener('click', resetGame);

        awaitingEndOfMove = true;
        setTimeout(() =>{
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;

            awaitingEndOfMove = false
            activeTile = null

        }, 1000);
    });
    return element
}
// build up tiles
for(let i = 0; i < tileCount; i++){
    const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
    const color = colorsPicklist[randomIndex]; 
    const tile = buildTile(color);

    colorsPicklist.splice(randomIndex, 1);
    tilesContainer.appendChild(tile);
}
resetGame(); // Initial setup

resetButton.addEventListener('click', resetGame);


/*
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);
*/