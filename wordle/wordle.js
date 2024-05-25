var height = 6;
var width = 5;

var row = 0;
var col = 0;
var gameOver = false;

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
  { term: "LEIAS", hint: "Princess and later General of the Rebel Alliance." },
  {
    term: "CLONE",
    hint: "Genetically identical soldiers created for the Grand Army of the Republic.",
  },
  { term: "HOLDO", hint: "Vice Admiral in the Resistance." },
  { term: "BINKS", hint: "Gungan from the planet Naboo." },
  { term: "WEDGE", hint: "Skilled X-wing pilot and member of Rogue Squadron." },
  { term: "JANGO", hint: "Bounty hunter and template for the clone army." },
  { term: "POE", hint: "Skilled pilot and commander in the Resistance." },
  { term: "SABRE", hint: "Elegant weapon used by Jedi and Sith." },
  { term: "TROOP", hint: "Group of soldiers or fighters." },
  {
    term: "WAMPA",
    hint: "Large, predatory creature native to the ice planet Hoth.",
  },
  { term: "BATUU", hint: "Remote outpost planet on the edge of the galaxy." },
  { term: "HONDO", hint: "Weequay pirate and smuggler." },
];

var selectedWordObj = words[Math.floor(Math.random() * words.length)];
var word = selectedWordObj.term;
var hint = selectedWordObj.hint;
let score = 0;
console.log(word);
let wordleAudio;
window.onload = async function () {
  intialize();

  const wordleAudioFiles = {
    wisdomTrialComplete: "complete-wisdom-trial.mp3",
  };

  wordleAudio = loadAudio(wordleAudio, wordleAudioFiles, "assets/sounds/");
};

function intialize() {
  // Create the game board
  for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
      let tile = document.createElement("span");
      tile.id = x.toString() + y.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }

  // Add event listeners to on-screen buttons
  document.querySelectorAll(".keyboard-button").forEach((button) => {
    button.addEventListener("click", () => {
      handleKeyPress(button.innerText);
    });
  });

  document.addEventListener("keyup", (e) => {
    if (gameOver) {
      console.log("Game is over. No more input accepted.");
      return;
    }

    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (col < width) {
        let currTile = document.getElementById(row.toString() + col.toString());
        if (currTile.innerText == "") {
          currTile.innerText = e.key.toUpperCase();
          col += 1;
        }
      }
    } else if (e.code == "Backspace") {
      if (0 < col && col <= width) {
        col -= 1;
      }
      let currTile = document.getElementById(row.toString() + col.toString());
      currTile.innerText = "";
    } else if (e.code == "Enter") {
      checkForMatch();
      row += 1;
      col = 0;
    }

    if (!gameOver && row == height) {
      gameOver = true;
      document.getElementById("display_box").innerText = word;
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

    if (correctCount == width) {
      gameOver = true;
      if (userAllowsSounds) {
        wordleAudio.wisdomTrialComplete.play();
      }
    }
  }

  for (let colm = 0; colm < width; colm++) {
    let currTile = document.getElementById(row.toString() + colm.toString());
    let letter = currTile.innerText;

    // skip the letter if it has been marked correct
    if (!currTile.classList.contains("correct")) {
      if (word.includes(letter) && letterCount[letter] > 0) {
        currTile.classList.add("exist");
        letterCount[letter] -= 1;
      } else {
        currTile.classList.add("absent");
      }
    }
  }
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
  if (col < width) {
    let currTile = document.getElementById(row.toString() + col.toString());
    if (currTile.innerText == "") {
      currTile.innerText = key.toUpperCase();
      col += 1;
    }
  }

  // Check for Enter key press
  if (key === "Enter") {
    checkForMatch();
    row += 1;
    col = 0;
  }

  // Check for Backspace key press
  if (key === "Backspace") {
    if (col > 0) {
      col -= 1;
      let currTile = document.getElementById(row.toString() + col.toString());
      currTile.innerText = "";
    }
  }
}
