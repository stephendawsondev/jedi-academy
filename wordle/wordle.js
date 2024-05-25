var height = 6; 
var width = 5; 

var row = 0; 
var col = 0; 
var gameOver = false;
var word = "FFORCE";

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

        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -=1;
            }
            let currTile = document.getElementById(row.toString() + col.toString());
            currTile.innerText = "";
        }

        else if (e.code == "Enter") {
            checkForMatch();
            row += 1; 
            col = 0; 
        }


        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;

        }
    });
}

function checkForMatch() {
    let correctCount = 0;
    let letterCount = {};
    mapLetterCount(letterCount);
    console.log(letterCount);
    for (let colm = 0; colm < width; colm++) {
        let currTile = document.getElementById(row.toString()  + colm.toString());
        let letter = currTile.innerText;


        if (word[colm] == letter) {
            currTile.classList.add("correct");
            correctCount += 1;
        } 
        else if (word.includes(letter)) {
            currTile.classList.add("exist");
        } 
        else {
            currTile.classList.add("absent");
        }

        if (correctCount == width) {
            gameOver = true;
        }

    }
}


function mapLetterCount(letterCount){
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];

        if (letterCount[letter]) {
           letterCount[letter] += 1;
        } 
        else {
           letterCount[letter] = 1;
        }
    }
}