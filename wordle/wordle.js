
var height = 6; 
var width = 5; 

var row = 0; 
var col = 0; 


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
}