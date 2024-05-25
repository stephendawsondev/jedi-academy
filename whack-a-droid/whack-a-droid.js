let droidTile;
let jawaTile;
let score = 0;
let gameOver = false;

document.addEventListener("DOMContentLoaded", async function () {
    let whackADroidAudio;

    const whackADroidSoundFiles = {
        droidBleep: "r2d2-sound.mp3",
        jawaAngry: "jawa-angry.mp3",
    };

    whackADroidAudio = await loadAudio(
        whackADroidAudio,
        whackADroidSoundFiles,
        "assets/sounds/"
    );


    // audioObject.r2d2Scream.play();

    // audioObject.r2d2Scream.play();
    // whackADroidAudio.jawaAngry.play();

});

window.onload = function () {
    setGame();
}

function setGame() {
    // Set up grid for game board in HTML
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement('div');
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById('board').appendChild(tile);
    }

    setInterval(setDroid, 3000); // 1000ms = 1 second
    setInterval(setJawa, 3000); // 2000ms = 2 seconds
}

getRandomTile = () => {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

setDroid = () => {

    if (gameOver) {
        return;
    }

    if (droidTile) {
        droidTile.innerHTML = '';
    }
    let droid = document.createElement('img');
    droid.src = 'assets/images/droid.png';
    // Generate a random number from 0-8 for the tile
    let num = getRandomTile();
    if (jawaTile && jawaTile.id == num) {
        return;
    }
    droidTile = document.getElementById(num);
    droidTile.appendChild(droid);
}

setJawa = () => {

    if (gameOver) {
        return;
    }

    if (jawaTile) {
        jawaTile.innerHTML = '';
    }
    let jawa = document.createElement('img');
    jawa.src = 'assets/images/jawa.png';

    let num = getRandomTile();
    if (droidTile && droidTile.id == num) {
        return;
    }
    jawaTile = document.getElementById(num);
    jawaTile.appendChild(jawa);
}

selectTile = () => {

    if (gameOver) {
        return;
    }
    console.log('clicked');
    if (this == droidTile) {
        console.log('clickedd');
        score += 10;
        // Update score
        document.getElementById('score').innerText = score.toString();
    }
    else if (this == jawaTile) {
        document.getElementById('score').innerText = "Game Over! You scored  " + score.toString() + 'points';
        gameOver = true;
    }
}
// Get the modal
let modal = document.getElementById("myModal");

// Open modal when clicked
let instruction = document.getElementById('instructions');

instruction.addEventListener('click', () => {
    modal.style.display = 'block';
})

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

span.addEventListener('click', () => {
    modal.style.display = 'none';
})