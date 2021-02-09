const list = document.querySelector(".grocery-list-container");
const card = document.querySelector(".row-extendable-card");

list.addEventListener("click", function (event) {
    if (event.target.parentElement.contains("row-extendable-card")) {
        console.log(event.target.parentElement);
    }
});
