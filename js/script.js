/**
 * Initializes the local storage with the default structure if not already set.
 */
const initializeLocalStorage = () => {
  const initialData = {
    wordle: { result: 0, gameComplete: false },
    "whack-a-droid": { result: 0, gameComplete: false },
    memory: { result: 0, gameComplete: false },
    allGamesComplete: false,
    totalScore: 0,
  };

  if (!localStorage.getItem("gameData")) {
    localStorage.setItem("gameData", JSON.stringify(initialData));
  }
};

/**
 * Calculates the average score of all games rounded to the nearest integer.
 * @returns {number} - The average score of all games.
 */
const calculateAverageScore = () => {
  const gameData = JSON.parse(localStorage.getItem("gameData"));
  const totalScore =
    gameData.wordle.result +
    gameData["whack-a-droid"].result +
    gameData.memory.result;
  const averageScore = Math.floor(totalScore / 3);
  return averageScore;
};

/**
 * Updates the local storage with the provided game data.
 * @param {string} game - The name of the game (e.g., 'wordle', 'whack-a-droid', 'memory').
 * @param {object} data - The data object containing result and gameComplete status.
 * Example:
 * {
 * result: 0,
 * gameComplete: false
 * }
 */
const updateLocalStorage = (game, data) => {
  const gameData = JSON.parse(localStorage.getItem("gameData"));
  gameData[game] = data;

  // Check if all games are complete
  gameData.allGamesComplete =
    gameData.wordle.gameComplete &&
    gameData["whack-a-droid"].gameComplete &&
    gameData.memory.gameComplete;

  if (gameData.allGamesComplete) {
    gameData.totalScore = calculateAverageScore();
  }

  localStorage.setItem("gameData", JSON.stringify(gameData));
};

/**
 * Clears the data for that game in the local storage.
 * @param {string} game - The name of the game (e.g., 'wordle', 'whack-a-droid', 'memory').
 */
const clearGameData = (game) => {
  const gameData = JSON.parse(localStorage.getItem("gameData"));
  gameData[game] = { result: 0, gameComplete: false };
  localStorage.setItem("gameData", JSON.stringify(gameData));
};

/**
 * Clears the local storage for game data.
 */
const clearLocalStorage = () => {
  localStorage.removeItem("gameData");
  initializeLocalStorage();
};

document.addEventListener("DOMContentLoaded", () => {
  initializeLocalStorage();
});

// *********** Home Page JS

document.addEventListener("DOMContentLoaded", function() {
  const playButton = document.querySelector(".home-play-button");
  const nameInput = document.querySelector(".name-input");
  const nameSubmitButton = document.querySelector(".name-submit-button");
  const gameChoices = document.querySelector(".game-choices");
  const header = document.querySelector(".header");
  const infoButton = document.querySelector(".info-button");
  const popupDialog = document.querySelector(".popup-dialog");
  const closePopupButton = document.querySelector(".close-popup-button");


  playButton.addEventListener("click", function(event) {
      event.preventDefault();
      // Hide the main header and the play button, and show the name input field
      header.style.display = "none";
      playButton.style.display = "none";
      infoButton.style.display = "none"; // Hide the "How to Play" button when "Enter the Jedi Temple" button is clicked
      nameInput.style.display = "block";
  });

  nameSubmitButton.addEventListener("click", function(event) {
      event.preventDefault();
      const userName = document.getElementById("name").value.trim();
      if (userName !== "") {
          nameInput.style.display = "none";
          gameChoices.style.display = "block";
      } else {
          alert("Please enter your name.");
      }
  });

  infoButton.addEventListener("click", function(event) {
      event.preventDefault();
      // Show the pop-up dialog
      popupDialog.showModal();
  });

  closePopupButton.addEventListener("click", function(event) {
      event.preventDefault();
      // Close the pop-up dialog
      popupDialog.close();
  });
});






