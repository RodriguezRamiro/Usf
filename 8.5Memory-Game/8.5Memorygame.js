const tilesContainer = document.querySelector(".tiles");
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

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

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let seconds = 0;
let score = 0;
let timerInterval;  // Stores the interval ID for the timer
let revealedCount = 0;
const tileCount = COLORS.length;

function startGame() {
    resetGame(); // Reset the game first to clear existing tiles and score
    shuffleCards(); // Shuffle and build the game board
    startTimer(); // Start the timer
}

function startTimer() {
  if (timerInterval) return; // Prevent starting multiple timers

  timerInterval = setInterval(() => {
    seconds++; // Increment seconds
    timerElement.textContent = seconds + " seconds"; // Update timer display
  }, 1000);
}

function resetGame() {
  clearInterval(timerInterval); // Stop the timer
  timerInterval = null; // Reset the interval ID
  seconds = 0; // Reset the timer
  resetTimer(); // Reset the timer display
  resetScore(); // Reset the score
  tilesContainer.innerHTML = ''; // Clear existing tiles
  revealedCount = 0; // Reset revealed count
}

function resetTimer() {
  seconds = 0;
  timerElement.textContent = '0 seconds'; // Update timer display
}

function resetScore() {
  score = 0;
  scoreElement.textContent = '0'; // Update score display
}

function shuffleCards() {
  const colorsPicklist = [...COLORS, ...COLORS];

  // Shuffle and build tiles
  for (let i = 0; i < tileCount * 2; i++) {
    const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
    const color = colorsPicklist[randomIndex];
    const tile = buildTile(color);
    colorsPicklist.splice(randomIndex, 1); // Remove the color to avoid duplicates
    tilesContainer.appendChild(tile); // Add tile to the container
  }
}

function buildTile(color) {
  const element = document.createElement("div");
  element.classList.add("tile");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    if (lockBoard || element.getAttribute("data-revealed") === "true") {
      return; // Prevent flipping if the board is locked or the tile is already revealed
    }

    flipTile(element, color);
  });

  return element;
}

function flipTile(tile, color) {
  tile.style.backgroundColor = color; // Show color on tile
  if (!firstCard) {
    firstCard = tile; // First card flipped
  } else {
    secondCard = tile; // Second card flipped
    checkForMatch();
  }
}

function checkForMatch() {
  lockBoard = true;
  const isMatch = firstCard.getAttribute("data-color") === secondCard.getAttribute("data-color");

  if (isMatch) {
    handleTileMatch();
  } else {
    setTimeout(() => {
      unflipTiles();
    }, 1000);
  }
}

function handleTileMatch() {
  firstCard.setAttribute("data-revealed", "true");
  secondCard.setAttribute("data-revealed", "true");
  firstCard.removeEventListener("click", flipTile);
  secondCard.removeEventListener("click", flipTile);
  score++;
  scoreElement.textContent = score; // Update score display

  revealedCount += 2; // Increment revealed count

  if (revealedCount === tileCount * 2) {
    alert("Game Won!");
    resetGame(); // Reset game on win
  }

  resetBoard(); // Reset board for next turn
}

function unflipTiles() {
  firstCard.style.backgroundColor = ""; // Hide color on first card
  secondCard.style.backgroundColor = ""; // Hide color on second card
  resetBoard(); // Reset board for next turn
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Event listeners
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

// Initial setup
resetGame(); // Initial game setup
