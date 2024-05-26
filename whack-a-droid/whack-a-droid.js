let droidTile;
let jawaTile;
let score = 0;
let gameOver = false;
let timer = 30;
let highestScore = 0;
let droidInterval;
let jawaInterval;
let timerInterval;

document.addEventListener("DOMContentLoaded", async function () {
  let whackADroidAudio;
  const firstTimePlayed = playerData["whack-a-droid"].firstTimePlayed;
  if (firstTimePlayed) {
    setTimeout(() => {
      popupDialog.showModal();
    }, 1000);
  }
  const board = document.getElementById("board");
  const timerDisplay = document.getElementById("timer");
  const scoreDisplay = document.getElementById("score");
  const highScoreDisplay = document.getElementById("high-score");

  const whackADroidSoundFiles = {
    droidBleep: "r2d2-sound.mp3",
    jawaAngry: "jawa-angry.mp3",
    smashMetal: "smash-metal.mp3",
  };

  whackADroidAudio = await loadAudio(
    whackADroidAudio,
    whackADroidSoundFiles,
    "assets/sounds/"
  );

  if (userAllowsSounds) {
    whackADroidAudio.droidBleep.play();
  }

  const getRandomTile = () => {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
  };

  const setDroid = () => {
    if (gameOver) {
      return;
    }

    if (droidTile) {
      droidTile.innerHTML = "";
    }
    let droid = document.createElement("img");
    droid.src = "assets/images/droid.png";
    droid.setAttribute("draggable", false);
    let num = getRandomTile();
    if (jawaTile && jawaTile.id == num) {
      return;
    }
    droidTile = document.getElementById(num);
    droidTile.appendChild(droid);
  };

  const setJawa = () => {
    if (gameOver) {
      return;
    }

    if (jawaTile) {
      jawaTile.innerHTML = "";
    }
    let jawa = document.createElement("img");
    jawa.src = "assets/images/jawa.png";
    jawa.setAttribute("draggable", false);

    let num = getRandomTile();
    if (droidTile && droidTile.id == num) {
      return;
    }
    jawaTile = document.getElementById(num);
    jawaTile.appendChild(jawa);
  };

  const selectTile = (event) => {
    if (gameOver) {
      return;
    }

    if (event.target.parentElement === droidTile) {
      if (userAllowsSounds) {
        whackADroidAudio.smashMetal.play();
      }
      score += 10;
      scoreDisplay.innerText = score.toString();
      droidTile.innerHTML = ""; // Make the droid disappear immediately
      droidTile = null; // Reset droidTile
    } else if (event.target.parentElement === jawaTile) {
      if (userAllowsSounds) {
        whackADroidAudio.jawaAngry.play();
      }
      endGame("You hit a Jawa!");
    }
  };

  const endGame = (message) => {
    gameOver = true;
    clearInterval(droidInterval);
    clearInterval(jawaInterval);
    clearInterval(timerInterval);
    if (score > highestScore) {
      highestScore = score;
      highScoreDisplay.innerText = highestScore.toString();
    }
    let rank = "You need 50 or more points to rank!";
    let result = 1;
    if (highestScore >= 50) {
      rank = "Padawan";
      result = 1;
    } else if (highestScore >= 120) {
      rank = "Jedi Knight";
      result = 2;
    } else if (highestScore >= 200) {
      rank = "Jedi Master";
      result = 3;
    }

    if (highestScore > 50) {
      updateLocalStorageGameData("whack-a-droid", {
        result: result,
        gameComplete: true,
        firstTimePlayed: false,
      });
    }

    overlay.querySelector(
      ".overlay-message"
    ).innerText = `${message} \nYou scored ${score} points.\nHigh score: ${highestScore}\nCurrent rank: ${rank}`;
    overlay.querySelector(".btn").innerText = "Retake the Trial";
    overlay.style.display = "flex";
  };

  const setUpBoard = () => {
    for (let i = 0; i < 9; i++) {
      let tile = document.createElement("div");
      tile.id = i.toString();
      tile.addEventListener("click", selectTile);
      board.appendChild(tile);
    }
  };

  const resetGame = () => {
    score = 0;
    timer = 30;
    gameOver = false;
    scoreDisplay.innerText = score.toString();
    timerDisplay.innerText = `Time Left: ${timer}`;
    setDroid();
    setJawa();
    startTimer();
    droidInterval = setInterval(setDroid, 1000);
    jawaInterval = setInterval(setJawa, 1250);
  };

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  const overlayMessage = document.createElement("p");
  overlayMessage.className = "overlay-message";
  const startButton = document.createElement("button");
  startButton.className = "btn";
  startButton.innerText = "Begin the Trial";
  startButton.addEventListener("click", () => {
    overlay.style.display = "none";
    resetGame();
  });

  overlay.appendChild(overlayMessage);
  overlay.appendChild(startButton);
  board.appendChild(overlay);

  setUpBoard();

  const startTimer = () => {
    timerInterval = setInterval(() => {
      if (gameOver) {
        clearInterval(timerInterval);
        return;
      }
      timer--;
      timerDisplay.innerText = `Time Left: ${timer}`;
      if (timer <= 0) {
        clearInterval(timerInterval);
        endGame("Time's Up!");
      }
    }, 1000);
  };

  // Show initial overlay
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlayMessage.innerText = "";
});
