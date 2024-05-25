// // ********************* how to play button popup


// document.addEventListener('DOMContentLoaded', function() {
//     const howToPlayButton = document.querySelector('.how-to-play-button');
//     const popupDialog = document.querySelector('.memory-popup-dialog');
//     const closePopupButton = document.querySelector('.close-popup-button');
  
//     howToPlayButton.addEventListener('click', function() {
//       popupDialog.showModal();
//     });
  
//     closePopupButton.addEventListener('click', function() {
//       popupDialog.close();
//     });
//   });

// // ********************* Main game logic

// const cards = document.querySelectorAll('.memory-card');

// let hasFlippedCard = false;
// let lockBoard = false;
// let firstCard, secondCard;

// function flipCard() {
//   if (lockBoard) return;
//   if (this === firstCard) return;

//   this.classList.add('flip');

//   if (!hasFlippedCard) {
//     // first click
//     hasFlippedCard = true;
//     firstCard = this;

//     return;
//   }

//   // second click
//   secondCard = this;

//   checkForMatch();
// }

// function checkForMatch() {
//   let isMatch = firstCard.dataset.logo === secondCard.dataset.logo;

//   isMatch ? disableCards() : unflipCards();
// }

// function disableCards() {
//   firstCard.removeEventListener('click', flipCard);
//   secondCard.removeEventListener('click', flipCard);

//   resetBoard();
// }

// function unflipCards() {
//   lockBoard = true;

//   setTimeout(() => {
//     firstCard.classList.remove('flip');
//     secondCard.classList.remove('flip');

//     resetBoard();
//   }, 1500);
// }

// function resetBoard() {
//   [hasFlippedCard, lockBoard] = [false, false];
//   [firstCard, secondCard] = [null, null];
// }

// // The cardds will need to be shuffled every time the player starts
// // Brackets round the funtion will immediatley invoke the function
// (function shuffle() {
//     cards.forEach(card => {
//         let randomPos = Math.floor(Math.random() * 12);
//         card.style.order = randomPos;
//     });
// })();

// cards.forEach(card => card.addEventListener('click', flipCard));

// // ********************* Score logic
// // ********************* Timer Logic

document.addEventListener('DOMContentLoaded', function() {
    // ********************* How to play button popup

    const howToPlayButton = document.querySelector('.how-to-play-button');
    const popupDialog = document.querySelector('.memory-popup-dialog');
    const closePopupButton = document.querySelector('.close-popup-button');
    
    howToPlayButton.addEventListener('click', function() {
      popupDialog.showModal();
    });
    
    closePopupButton.addEventListener('click', function() {
      popupDialog.close();
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
      lockBoard = true;
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
      score++;
      document.getElementById('score').innerHTML = score;
      if (score === 6) {
        stopTimer();
        alert('Congratulations! You found all pairs!');
      }
    }

    function unflipCards() {
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

    // The cards will need to be shuffled every time the player starts
    // Brackets round the function will immediately invoke the function
    function shuffle() {
      cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
      });
    }

    // ********************* Score and Timer Logic

    let countdown = null;
    let timeLeft = 30;
    let score = 0;

    function startGame() {
      resetGame();
      cards.forEach(card => card.addEventListener('click', flipCard));
      lockBoard = false;
      timeLeft = 30;
      score = 0;
      document.getElementById('score').innerHTML = '0';
      document.getElementById('timer').innerHTML = `${timeLeft}`;
      shuffle();
      startTimer();
    }

    function resetGame() {
      unflipAllCards();
      document.getElementById('score').innerHTML = '0';
      clearTimeout(countdown);
      document.getElementById('timer').innerHTML = '30';
      score = 0;
      lockBoard = false;
      hasFlippedCard = false;
      firstCard = null;
      secondCard = null;
    }

    function startTimer() {
      clearInterval(countdown);
      countdown = setInterval(function() {
        timeLeft--;
        document.getElementById('timer').innerHTML = `${timeLeft}`;
        if (timeLeft === 0) {
          stopTimer();
          lockBoard = true;
          alert('Time is up!');
        }
      }, 1000);
    }

    function stopTimer() {
      clearInterval(countdown);
    }

    function unflipAllCards() {
      cards.forEach(card => card.classList.remove('flip'));
    }

    // Event listeners
    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('resetGame').addEventListener('click', resetGame);
    cards.forEach(card => card.addEventListener('click', flipCard));

    // Initial shuffle
    shuffle();
});
