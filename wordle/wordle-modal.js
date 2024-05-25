const modal = document.querySelector(".modal");
const openWordleModal = document.querySelector(".open-wordle-modal");
const closeButton = document.querySelector(".close-button");

function openModal() {
        modal.style.display = "block";
};
function closeModal() {
        modal.style.display = "none";
}

window.addEventListener("click", function(ev) {
    if (ev.target == modal) {
        closeModal();
    }
});

openWordleModal.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
