// ********************* how to play button popup


document.addEventListener('DOMContentLoaded', function() {
    const howToPlayButton = document.querySelector('.how-to-play-button');
    const popupDialog = document.querySelector('.memory-popup-dialog');
    const closePopupButton = document.querySelector('.close-popup-button');
  
    howToPlayButton.addEventListener('click', function() {
      popupDialog.showModal();
    });
  
    closePopupButton.addEventListener('click', function() {
      popupDialog.close();
    });
  });

// ********************* Main game logic

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.logo === secondCard.dataset.logo;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// The cardds will need to be shuffled every time the player starts
// Brackets round the funtion will immediatley invoke the function
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

// ********************* Score logic
// ********************* Timer Logic

