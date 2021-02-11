const list = document.querySelector(".list-container");
const card = document.querySelector(".row-extendable-card");
const createRecordBtn = document.getElementById("createRecord");
const newItemForm = document.getElementById("newItemForm");
const formInputWarper = document.querySelector(".add-item-form");

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

createRecordBtn.onclick = function () {
    if (formInputWarper.classList.toggle("open")) {
        // newItemForm.style.display = "block";
    } else {
        // newItemForm.style.display = "none";
    }
};
