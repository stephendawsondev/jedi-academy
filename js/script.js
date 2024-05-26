let userAllowsSounds = false;
let userAllowsMusic = false;
let playerData = {};
let audioObject = {};

const repoName = "may-hackathon-2024";

const isGithubPages = window.location.href.includes("github.io");
const baseURL = isGithubPages ? `/${repoName}/` : "/";

const envAudioUrl = `${baseURL}public/`;
const envImageUrl = `${baseURL}assets/images/`;

const audioFiles = {
  battlemusic: 'starwars-battle-music.mp3'
};

if (document.querySelector(".how-to-play-button")) {
  const howToPlayButton = document.querySelector(".how-to-play-button");
  howToPlayButton?.addEventListener("click", function () {
    popupDialog.showModal();
  });
}
if (document.querySelector(".popup-dialog")) {
  const popupDialog = document.querySelector(".popup-dialog");
  const closePopupButton = document.querySelector(".close-popup-button");

  closePopupButton.addEventListener("click", function () {
    popupDialog.close();
  });
};

/**
 * Initializes the local storage with the default structure if not already set.
 */
const initializeLocalStorage = () => {
  const initialData = {
    wordle: { result: 0, gameComplete: false, firstTimePlayed: true },
    "whack-a-droid": {
      result: 0,
      gameComplete: false,
      firstTimePlayed: true,
    },
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
 * @param {Object} data - Data to update in local storage.
 */
const updateLocalStoragePlayerData = (data) => {
  const playerData = JSON.parse(localStorage.getItem("gameData"));
  if (data.hasOwnProperty("playerAllowsSound")) {
    playerData.playerAllowsSound = data.playerAllowsSound;
    userAllowsSounds = data.playerAllowsSound;
  }
  if (data.hasOwnProperty("playerAllowsMusic")) {
    playerData.playerAllowsMusic = data.playerAllowsMusic;
    userAllowsMusic = data.playerAllowsMusic;
  }
  localStorage.setItem("gameData", JSON.stringify(playerData));
};

/**
 * Loads the audio files.
 * @param {Object} audioObj - The audio object to load the files into.
 * @param {Object} audioFiles - The audio files to load.
 * @param {string} path - The path to the audio files.
 * @returns {Object} audioObj
 */
const loadAudio = (audioObj, audioFiles, path) => {
  audioObj = audioObj || {};
  for (const [key, fileName] of Object.entries(audioFiles)) {
    audioObj[key] = new Audio(`${path}${fileName}`);
    audioObj[key].volume = 0.3;
  }
  return audioObj;
};

/**
 * Adds event listeners to the audio icons.
 * Updates the local storage with the player's audio preferences.
 * Updates the audio icons based on the player's audio preferences.
 */
const addAudioIconEventListeners = () => {
  const musicIcon = document.getElementById("music-icon");
  const soundIcon = document.getElementById("sound-icon");
  musicIcon.src = userAllowsMusic
    ? `${envImageUrl}music_on.webp`
    : `${envImageUrl}music_off.webp`;
  soundIcon.src = userAllowsSounds
    ? `${envImageUrl}sound_on.webp`
    : `${envImageUrl}sound_off.webp`;

  const musicButton = document.getElementById("music-button");
  const soundButton = document.getElementById("sound-button");

  musicButton.addEventListener("click", (event) => {
    event.stopPropagation();
    userAllowsMusic = !userAllowsMusic;
    updateLocalStoragePlayerData({ playerAllowsMusic: userAllowsMusic });
    musicIcon.src = userAllowsMusic
      ? `${envImageUrl}music_on.webp`
      : `${envImageUrl}music_off.webp`;

    if (userAllowsMusic) {
      playMusic();
    } else {
      stopMusic();
    }
  });

  soundButton.addEventListener("click", () => {
    userAllowsSounds = !userAllowsSounds;
    updateLocalStoragePlayerData({ playerAllowsSound: userAllowsSounds });
    soundIcon.src = userAllowsSounds
      ? `${envImageUrl}sound_on.webp`
      : `${envImageUrl}sound_off.webp`;
  });
};

/**
 * Function to play the music
 */
const playMusic = () => {
  if (userAllowsMusic && audioObject.battlemusic) {
    audioObject.battlemusic.loop = true; // Set loop to true
   // audioObject.volume = 0.5;
    audioObject.battlemusic.play().catch(error => {
      console.error("Music play failed:", error);
    });
  }
};

/**
 * Function to stop the music
 */
const stopMusic = () => {
  if (audioObject.battlemusic) {
    audioObject.battlemusic.pause();
    audioObject.battlemusic.currentTime = 0; // Reset the audio to the beginning
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
  const averageScore = Math.round(totalScore / 3);
  return averageScore;
};

/**
 * Updates the local storage with the provided game data.
 * @param {string} game - The name of the game (e.g., 'wordle', 'whack-a-droid', 'memory').
 * @param {Object} data - The data object containing result and gameComplete status.
 * @example updateLocalStoragePlayerData('wordle', { result: 5, gameComplete: true, firstTimePlayed: false });
 */
const updateLocalStorageGameData = (game, data) => {
  const gameData = JSON.parse(localStorage.getItem("gameData"));
  gameData[game] = data;

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

initializeLocalStorage();
addAudioIconEventListeners();

audioObject = loadAudio(audioObject, audioFiles, envAudioUrl);

// Start playing music if allowed
if (userAllowsMusic) {
  playMusic();
}

if (document.querySelector(".back-button")) {
  const backButton = document.querySelector(".back-button");
  backButton.href = `${baseURL}`;
}
