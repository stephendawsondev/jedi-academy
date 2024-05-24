const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // second card
        hasFlippedCard = false;
        secondCard = this;

        // do the cards match?
        if (firstCard.dataset.logo === secondCard.dataset.logo){
            // its a match
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            // Not a match
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
        }, 1500);
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));