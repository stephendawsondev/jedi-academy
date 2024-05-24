var height = 6; 
var width = 5; 

var row = 0; 
var col = 0; 
var gameOver = false;

window.onload = function(){
    intialize();
}

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
        }
    });
}

// Trying to show letter in boxes on the button click of the keyboard-button

// const keyboardButton = document.querySelectorAll(".keyboard-button");
// const displayBox = document.getElementById("display-box");

// keyboardButton.forEach(button => {
   // button.addEventListener('click', function() {
     //   const letter = button.textContent;
      //  displayBox.textContent = letter;
    // })
// })

    