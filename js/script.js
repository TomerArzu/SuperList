// form
const formInputWarper = document.querySelector(".add-item-form");
const listModifiers = document.querySelector(".list-modifiers");
const closeFormBtn = document.getElementById("closeForm");

// list modifiers
const createRecordBtn = document.getElementById("createRecord");

// list
const list = document.querySelector(".list-container");
const card = document.querySelector(".row-extendable-card");

list.addEventListener("click", function (event) {
    if (event.target.classList.contains("card-collapsed")) {
        const subCard = event.target.nextElementSibling;
        if (subCard.classList.contains("expend")) {
            subCard.classList.remove("expend");
            subCard.closest(".row-extendable-card").classList.remove("expend");
        } else {
            subCard.classList.add("expend");
            subCard.closest(".row-extendable-card").classList.add("expend");
        }
    }
});

createRecordBtn.onclick = function () {
    formToggler();
};

closeFormBtn.addEventListener("click", function (event) {
    formToggler();
    event.preventDefault();
});

function formToggler() {
    if (formInputWarper.classList.toggle("expend")) {
        createRecordBtn.style.display = "none";
    } else {
        // listModifiers.classList.add("expend");
        createRecordBtn.style.display = "inline-block";
    }
}
