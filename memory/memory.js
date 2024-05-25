
document.addEventListener('DOMContentLoaded', async function() {

    // ***************** Sound Effects
    let memoryAudio;
    
    const memorySoundFiles = {
        r2d2happy: "r2r2-happy.mp3", // Succesful Match
        memoryTrialComplete: "trial-memory-completion.mp3", // Game Completion
        // wrongMatch: "r2d2-scream.mp3" // Incorrect Match
    };
    
    memoryAudio = await loadAudio(
        memoryAudio,
        memorySoundFiles,
        "assets/sounds/"
    );


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
    let lockBoard = true;
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
    //   isMatch ? disableCards() : unflipCards();
        if (isMatch == true){
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        memoryAudio.r2d2happy.play();

        resetBoard();
        score++;
        document.getElementById('score').innerHTML = score;
        if (score === 6) {
        stopTimer();
        memoryAudio.memoryTrialComplete.play();
        // alert('Congratulations! You found all pairs!');
        }
    }

    function unflipCards() {
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        // memoryAudio.wrongMatch.play();
        resetBoard();
      }, 1000);
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
      lockBoard = true;
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


