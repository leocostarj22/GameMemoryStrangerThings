const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

let points = 0;
let turns = 0;

function updatePoints() {
  currentPoints = document.getElementById('points');
  points++;
  currentPoints.innerHTML = points;
}

function updateTurns() {
  currentTurns = document.getElementById('turns');
  turns++;
  currentTurns.innerHTML = turns;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  checkForMatch();
  updateTurns();
}

function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    updatePoints();
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  musica3.play();
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    musica2.play();
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});


