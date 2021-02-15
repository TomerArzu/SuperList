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

createRecordBtn.addEventListener("click", function () {
    const modalForm = document.getElementById("modal-form");
    if (!modalForm.hasChildNodes()) {
        const formTemplate = document.querySelector("#newItemFormTemplate");
        const formClone = formTemplate.content.cloneNode(true);
        attachModal(modalForm, formClone);
    } else {
        modalForm.firstElementChild.classList.remove("is-visible");
    }
});

function attachModal(fragment, content) {
    const modalTemplate = document.querySelector("#modalTemplate");
    const modalClone = modalTemplate.content.cloneNode("true");
    const modalContent = modalClone.getElementById("m-content");
    modalContent.appendChild(content);
    fragment.appendChild(modalClone);
}

function detachModal(modalParent) {
    // TODO: complete the function
}
