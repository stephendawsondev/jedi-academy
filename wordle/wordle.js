const words = [
  {
    term: "FORCE",
    hint: "The mystical energy field that binds the galaxy together.",
  },
  { term: "SITHS", hint: "Dark side practitioners who oppose the Jedi." },
  {
    term: "DROID",
    hint: "Mechanical beings programmed to serve various purposes.",
  },
  { term: "JABBA", hint: "Infamous Hutt crime lord." },
  { term: "PADME", hint: "Former queen and senator of Naboo." },
  { term: "REBEL", hint: "Group opposing the tyranny of the Galactic Empire." },
  {
    term: "EWOKS",
    hint: "Small, furry inhabitants of the forest moon of Endor.",
  },
  {
    term: "CLONE",
    hint: "Genetically identical soldiers created for the Grand Army of the Republic.",
  },
  { term: "HOLDO", hint: "Vice Admiral in the Resistance." },
  { term: "BINKS", hint: "Gungan from the planet Naboo." },
  { term: "WEDGE", hint: "Skilled X-wing pilot and member of Rogue Squadron." },
  { term: "JANGO", hint: "Bounty hunter and template for the clone army." },
  { term: "SABRE", hint: "Elegant weapon used by Jedi and Sith." },
  { term: "TROOP", hint: "Group of soldiers or fighters." },
  {
    term: "WAMPA",
    hint: "Large, predatory creature native to the ice planet Hoth.",
  },
  { term: "BATUU", hint: "Remote outpost planet on the edge of the galaxy." },
  { term: "HONDO", hint: "Weequay pirate and smuggler." },
];

var height = 6;
var width = 5;
var row = 0;
var col = 0;
var gameOver = false;
var guessedLetters = [];

var selectedWordObj = words[Math.floor(Math.random() * words.length)];
var word = selectedWordObj.term;
var hint = selectedWordObj.hint;

const playAgainButton = document.querySelector(".play-again");

let score = 0;
let attempts = 0;
let wordleAudio;

window.onload = async function () {
  const firstTimePlayed = playerData["wordle"].firstTimePlayed;
  if (firstTimePlayed) {
    setTimeout(() => {
      popupDialog.showModal();
    }, 1000);
  }
  initialize();

  const wordleAudioFiles = {
    wisdomTrialComplete: "complete-wisdom-trial.mp3",
  };

  wordleAudio = loadAudio(wordleAudio, wordleAudioFiles, "assets/sounds/");
};

function initialize() {
  guessedLetters = [];
  word = selectedWordObj.term;
  const board = document.getElementById("board");
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < height * width; i++) {
    let tile = document.createElement("span");
    tile.id = Math.floor(i / width).toString() + (i % width).toString();
    tile.classList.add("tile");
    tile.innerText = "";
    fragment.appendChild(tile);
  }

  board.appendChild(fragment);

  // Add event listeners to on-screen buttons
  document.querySelectorAll(".keyboard-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      let key = event.target.innerText.toUpperCase();
      if (key === "ENTER") key = "Enter";
      handleKeyPress(key);
      if (!gameOver && row == height) {
        gameOver = true;
        document.getElementById("display_box").innerText =  "Game Over! correct word is " + word;
      }
    });
  });

  document.querySelector(".backspace").addEventListener("click", () => {
    handleKeyPress("Backspace");
  });

  document.addEventListener("keyup", (e) => {
    if (gameOver) {
      console.log("Game is over. No more input accepted.");
      return;
    }

    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      handleKeyPress(e.key.toUpperCase());
    } else if (e.code == "Backspace") {
      handleKeyPress("Backspace");
    } else if (e.code == "Enter") {
      handleKeyPress("Enter");
    }

    if (!gameOver && row == height) {
      gameOver = true;
      document.getElementById("display_box").innerText =  "Game Over! correct word is " + word;
    }
  });
}

function checkForMatch() {
  let correctCount = 0;
  let letterCount = {};
  mapLetterCount(letterCount);
  for (let colm = 0; colm < width; colm++) {
    let currTile = document.getElementById(row.toString() + colm.toString());
    let letter = currTile.innerText;

    if (word[colm] == letter) {
      currTile.classList.add("correct");
      correctCount += 1;
      letterCount[letter] -= 1;
    }
    console.log(word);

    if (correctCount == width) {
      gameOver = true;
      document.getElementById("display_box").innerText =  "Congratulations! you guessed the correct word and attempt number is " + attempts;
      
      if (userAllowsSounds) {
        wordleAudio.wisdomTrialComplete.play();
      }
      score = calculateScore();
      updateLocalStorageGameData("wordle", {
        result: score,
        gameComplete: true,
        firstTimePlayed: false,
      });
    }
  }

  for (let colm = 0; colm < width; colm++) {
    let currTile = document.getElementById(row.toString() + colm.toString());
    let letter = currTile.innerText;
    let keyboardKey = document.querySelector(
      `.keyboard-button[data-key="${letter}"]`
    );

    guessedLetters.push(letter);

    // skip the letter if it has been marked correct
    if (!currTile.classList.contains("correct")) {
      if (word.includes(letter) && letterCount[letter] > 0) {
        currTile.classList.add("exist");
        letterCount[letter] -= 1;
        if (keyboardKey) keyboardKey.classList.add("exist");
      } else {
        currTile.classList.add("absent");
        if (keyboardKey) keyboardKey.classList.add("guess-incorrect");
      }
    } else {
      if (keyboardKey) keyboardKey.classList.add("correct");
    }
  }

  attempts++;
}

function mapLetterCount(letterCount) {
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];

    if (letterCount[letter]) {
      letterCount[letter] += 1;
    } else {
      letterCount[letter] = 1;
    }
  }
}

function handleKeyPress(key) {
  if (gameOver) {
    console.log("Game is over. No more input accepted.");
    return;
  }

  if (key === "Enter") {
    if (col === width) {
      checkForMatch();
      row += 1;
      col = 0;
      
    } else {
      console.log("Not enough letters entered.");
      document.getElementById("display_box").innerText =  "Not enough letters entered.";
      setTimeout(() => {
        console.log("This message is displayed after 2 seconds.");
        document.getElementById("display_box").innerText =  "";
      }, 2000);
      
    }
  } else if (key === "Backspace") {
    if (col > 0) {
      col -= 1;
      let currTile = document.getElementById(row.toString() + col.toString());
      currTile.innerText = "";
    }
  } else if (col < width && /^[A-Z]$/.test(key)) {
    let currTile = document.getElementById(row.toString() + col.toString());
    if (currTile.innerText == "") {
      currTile.innerText = key;
      col += 1;
    }
  }
}

playAgainButton.addEventListener("click", () => {
  window.location.reload();
});

function calculateScore() {
  if (attempts <= 3) {
    return 3;
  } else if (attempts <= 4) {
    return 2;
  } else if (attempts <= 6) {
    return 1;
  } else {
    return 0;
  }
}
