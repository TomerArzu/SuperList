const list = document.querySelector(".grocery-list-container");
const card = document.querySelector(".row-extendable-card");

list.addEventListener("click", function (event) {
    console.log(event.target.parentElement);
    if (event.target.parentElement.classList.contains("opened")) {
        event.target.classList.remove("opened");
    } else {
        event.target.classList.add("opened");
    }
});

function expendCollapseCard(elem) {
    // console.log(elem);
    if (elem.classList.contains("opened")) {
        elem.classList.remove("opened");
    } else {
        elem.classList.add("opened");
    }
}
