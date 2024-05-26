let droidTile;
let jawaTile;
let score = 0;
let gameOver = false;
let timer = 30;

document.addEventListener("DOMContentLoaded", async function () {
  let whackADroidAudio;
  const board = document.getElementById("board");

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
      document.getElementById("score").innerText = score.toString();
    } else if (event.target.parentElement === jawaTile) {
      if (userAllowsSounds) {
        whackADroidAudio.jawaAngry.play();
      }
      document.getElementById("score").innerText =
        "Game Over! You scored " + score.toString() + " points";
      gameOver = true;
    }
  };

  function setUpBoard() {
    for (let i = 0; i < 9; i++) {
      let tile = document.createElement("div");
      tile.id = i.toString();
      tile.addEventListener("click", selectTile);
      board.appendChild(tile);
    }
  }

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  const startButton = document.createElement("button");
  startButton.className = "btn";
  startButton.innerText = "Start Game";
  startButton.addEventListener("click", () => {
    overlay.style.display = "none";

    setInterval(setDroid, 1000);
    setInterval(setJawa, 1500);

    // Start the timer ******* DM
    startTimer();
  });

  setUpBoard();
  overlay.appendChild(startButton);
  board.appendChild(overlay);

  // Function to start the timer ********* DM
  const startTimer = () => {
    const timerDisplay = document.getElementById("timer");
    const countdown = setInterval(() => {
      if (gameOver) {
        clearInterval(countdown);
        return;
      }
      timer--;
      timerDisplay.innerText = `Time Left: ${timer}`;
      if (timer <= 0) {
        clearInterval(countdown);
        document.getElementById("score").innerText =
          "Time's Up! You scored " + score.toString() + " points";
        gameOver = true;
      }
    }, 1000);
  };
});
