// *********** Home Page JS

document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(".home-play-button");
  const nameInput = document.querySelector(".name-input");
  const nameSubmitButton = document.querySelector(".name-submit-button");
  const gameChoices = document.querySelector(".game-choices");
  const header = document.querySelector(".header");
  const infoButton = document.querySelector(".info-button");
  const popupDialog = document.querySelector(".popup-dialog");
  const closePopupButton = document.querySelector(".close-popup-button");
  const resultsButton = document.querySelector('.results-button');
  const meetTheTeamButton = document.querySelector('.meet-the-team-button');

  const localStorageData = JSON.parse(localStorage.getItem("gameData")) || {
    name: "",
  };

  playButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Hide the main header and the play button, and show the name input field
    header.style.display = "none";
    playButton.style.display = "none";
    infoButton.style.display = "none"; 
    resultsButton.style.display = "none"; 
    meetTheTeamButton.style.display = "none"; 

    if (
      localStorageData["name"] == "" ||
      localStorageData["name"] == undefined ||
      localStorageData["name"] == null
    ) {
      nameInput.style.display = "block";
    } else {
      gameChoices.style.display = "block";
    }
  });

  nameSubmitButton.addEventListener("click", function (event) {
    event.preventDefault();
    const userName = document.getElementById("name").value.trim();
    if (userName !== "") {
      // Save the name to local storage
      localStorageData["name"] = userName;
      localStorage.setItem("gameData", JSON.stringify(localStorageData));

      nameInput.style.display = "none";
      gameChoices.style.display = "block";
    } else {
      alert("Please enter your name.");
    }
  });

  infoButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Show the pop-up dialog
    popupDialog.showModal();
  });

  closePopupButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Close the pop-up dialog
    popupDialog.close();
  });
});
