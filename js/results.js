document.addEventListener("DOMContentLoaded", async () => {
  const localStorageValues = JSON.parse(localStorage.getItem("gameData"));

  // Ensure all game data is present before proceeding
  if (
    !localStorageValues.wordle ||
    !localStorageValues["whack-a-droid"] ||
    !localStorageValues.memory
  ) {
    console.error("Incomplete game data");
    return;
  }

  // Calculate the totalScore if it's not already done
  if (!localStorageValues.allGamesComplete) return;
  localStorageValues.totalScore = await calculateAverageScore();

  const ranks = ["Padawan", "Jedi Knight", "Jedi Master"];

  document.querySelector(".results-content").style.display = "block";
  document.querySelector(".all-trails-incomplete").style.display = "none";

  const memoryResult = ranks[localStorageValues.memory.result - 1];
  const agilityResult = ranks[localStorageValues["whack-a-droid"].result - 1];
  const wisdomResult = ranks[localStorageValues.wordle.result - 1];
  const overallScore = ranks[localStorageValues.totalScore - 1];

  const memoryResultSpan = document.querySelector("#memory-result span");
  const agilityResultSpan = document.querySelector("#agility-result span");
  const wisdomResultSpan = document.querySelector("#wisdom-result span");
  const overallRank = document.querySelector("#overall-result");

  memoryResultSpan.innerText = memoryResult;
  agilityResultSpan.innerText = agilityResult;
  wisdomResultSpan.innerText = wisdomResult;
  overallRank.innerText = overallScore;
});
