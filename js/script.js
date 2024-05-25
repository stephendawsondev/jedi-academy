let userAllowsSounds;
let userAllowsMusic;
let playerData = {};
let audioObject = {};

const audioFiles = {
  r2d2Scream: "r2d2-scream.mp3",
};

/**
 * Initializes the local storage with the default structure if not already set.
 */
const initializeLocalStorage = () => {
  const initialData = {
    wordle: { result: 0, gameComplete: false, firstTimePlayed: true },
    "whack-a-droid": { result: 0, gameComplete: false, firstTimePlayed: true },
    memory: { result: 0, gameComplete: false, firstTimePlayed: true },
    name: "",
    allGamesComplete: false,
    totalScore: 0,
    playerAllowsSound: false,
    playerAllowsMusic: false,
  };

  if (!localStorage.getItem("gameData")) {
    localStorage.setItem("gameData", JSON.stringify(initialData));
  }

  playerData = JSON.parse(localStorage.getItem("gameData"));

  userAllowsSounds = playerData.playerAllowsSound;
  userAllowsMusic = playerData.playerAllowsMusic;
};

/**
 * Updates the player data in local storage.
 * @returns {Object} playerData
 */
const updateLocalStoragePlayerData = (data) => {
  const playerData = JSON.parse(localStorage.getItem("gameData"));
  playerData.playerAllowsSound = data.playerAllowsSound;
  playerData.playerAllowsMusic = data.playerAllowsMusic;
  localStorage.setItem("gameData", JSON.stringify(playerData));
  return playerData;
};

/**
 * Loads the audio files
 * @param {Object} audioObj - The audio object to load the files into.
 * @param {Object} audioFiles - The audio files to load.
 * @param {string} path - The path to the audio files.
 * @returns {Object} audioObj
 */
const loadAudio = (audioObj, audioFiles, path) => {
  audioObj = audioObj || {};
  for (const [key, fileName] of Object.entries(audioFiles)) {
    audioObj[key] = new Audio(`${path}${fileName}`);
  }

  return audioObj;
};

/**
 * Adds event listeners to the audio icons.
 * Updates the local storage with the player's audio preferences.
 * Updates the audio icons based on the player's audio preferences.
 * @returns {void}
 * @listens musicButton:click
 * @listens soundButton:click
 * @fires updateLocalStoragePlayerData
 * @fires calculateAverageScore
 * @fires loadAudio
 */
const addAudioIconEventListeners = () => {
  // Update icons based on initial state
  const musicIcon = document.getElementById("music-icon");
  const soundIcon = document.getElementById("sound-icon");
  musicIcon.src = userAllowsMusic
    ? `../assets/images/music_on.webp`
    : `../assets/images/music_off.webp`;
  soundIcon.src = userAllowsSounds
    ? `../assets/images/sound_on.webp`
    : `../assets/images/sound_off.webp`;

  // Add event listeners
  const musicButton = document.getElementById("music-button");
  const soundButton = document.getElementById("sound-button");

  musicButton.addEventListener("click", (event) => {
    event.stopPropagation();
    userAllowsMusic = !userAllowsMusic;
    updateLocalStoragePlayerData({
      ...playerData,
      playerAllowsMusic: userAllowsMusic,
    });

    musicIcon.src = userAllowsMusic
      ? `../assets/images/music_on.webp`
      : `../assets/images/music_off.webp`;
  });

  soundButton.addEventListener("click", () => {
    userAllowsSounds = !userAllowsSounds;
    updateLocalStoragePlayerData({
      ...playerData,
      playerAllowsSound: userAllowsSounds,
    });

    soundIcon.src = userAllowsSounds
      ? `../assets/images/sound_on.webp`
      : `../assets/images/sound_off.webp`;
  });
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
const updateLocalStorageGameData = (game, data) => {
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
  gameData[game] = { result: 0, gameComplete: false, firstTimePlayed: false };
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
  addAudioIconEventListeners();
  audioObject = loadAudio(audioObject, audioFiles, "../public/");
});
