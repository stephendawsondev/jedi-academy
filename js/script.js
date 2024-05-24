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


document.addEventListener("DOMContentLoaded", function() {
  const playButton = document.querySelector(".home-play-button");
  const header = document.querySelector(".header");
  const headerTitles = document.querySelectorAll(".header h1, .header h3");
  const gameChoices = document.querySelector(".game-choices");

  playButton.addEventListener("click", function(event) {
      event.preventDefault();

      // Hide the header titles and the play button with a smooth transition
      headerTitles.forEach(title => title.classList.add("hidden"));
      playButton.classList.add("hidden");

      // Wait for the transition to complete before hiding the header and showing game choices
      setTimeout(function() {
          header.style.display = "none";
          gameChoices.style.display = "block";

          // Trigger reflow to ensure the transition runs
          gameChoices.offsetHeight;

          gameChoices.classList.remove("hidden");
      }, 1000); // Wait for the duration of the transition (1s)
  });
});

