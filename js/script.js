const list = document.querySelector(".grocery-list-container");
const card = document.querySelector(".row-extendable-card");

list.addEventListener("click", function (event) {
    if (event.target.classList.contains("card-collapsed")) {
        const subCard = event.target.nextElementSibling;
        if (subCard.classList.contains("open")) {
            subCard.classList.remove("open");
            subCard.closest(".row-extendable-card").classList.remove("open");
        } else {
            subCard.classList.add("open");
            subCard.closest(".row-extendable-card").classList.add("open");
        }
    }
});

function createExtendableRow() {}
