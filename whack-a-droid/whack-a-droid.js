let droidTile;
let jawaTile;
let score = 0;
let gameOver = false;

document.addEventListener("DOMContentLoaded", async function () {
  let whackADroidAudio;

  const whackADroidSoundFiles = {
    droidBleep: "r2d2-sound.mp3",
    jawaAngry: "jawa-angry.mp3",
  };

  whackADroidAudio = await loadAudio(
    whackADroidAudio,
    whackADroidSoundFiles,
    "assets/sounds/"
  );

  if (userAllowsSounds) {
    whackADroidAudio.droidBleep.play();
  }

  // audioObject.r2d2Scream.play();

  // audioObject.r2d2Scream.play();
  // whackADroidAudio.jawaAngry.play();  const getRandomTile = () => {
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

    // Use parentElement to check the tile div instead of the image itself
    if (event.target.parentElement === droidTile) {
      if (userAllowsSounds) {
        whackADroidAudio.droidBleep.play();
      }
      score += 10;
      // Update score
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

  function setGame() {
    // Set up grid for game board in HTML
    for (let i = 0; i < 9; i++) {
      let tile = document.createElement("div");
      tile.id = i.toString();
      tile.addEventListener("click", selectTile);
      document.getElementById("board").appendChild(tile);
    }

    setInterval(setDroid, 3000); // 1000ms = 1 second
    setInterval(setJawa, 3000); // 2000ms = 2 seconds
  }

  setGame();
});
