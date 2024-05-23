document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementById("dialog");
  const dialogText = document.getElementById("dialog-text");
  const nextButton = document.getElementById("next-button");

  let textIndex = 0;

  const texts = [
    "Welcome to the Star Wars adventure!",
    "You are about to embark on a journey...",
    "Make wise choices and may the Force be with you.",
    runWhackAMoleGame,
  ];

  const showDialog = () => {
    dialog.style.display = "block";
    updateDialogContent();
  };

  const updateDialogContent = () => {
    const currentTextOrFunction = texts[textIndex];
    if (typeof currentTextOrFunction === "string") {
      dialogText.textContent = currentTextOrFunction;
    } else if (typeof currentTextOrFunction === "function") {
      dialog.style.display = "none";
      currentTextOrFunction();
    }
  };

  const nextText = () => {
    if (textIndex < texts.length - 1) {
      textIndex++;
      updateDialogContent();
    } else {
      dialog.style.display = "none";
    }
  };

  nextButton.addEventListener("click", nextText);

  // Initialize dialog
  showDialog();

  // Example function to demonstrate functionality
  function runWhackAMoleGame() {
    alert("Running Whack-A-JarJar Game!");
    // Add your game initialization code here
  }
});
