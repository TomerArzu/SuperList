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
        const formHeading = "Add New Refuel";
        attachModal(modalForm, formHeading, formClone);
    }
});

function attachModal(fragment, heading, content) {
    const modalTemplate = document.querySelector("#modalTemplate");
    const headingNode = document.createTextNode(heading);
    const modalClone = modalTemplate.content.cloneNode("true");
    const modalHeader = modalClone.getElementById("m-header");
    const modalContent = modalClone.getElementById("m-content");
    modalHeader.insertBefore(
        headingNode,
        modalClone.querySelector("#m-header>[data-close]")
    );
    modalContent.appendChild(content);
    fragment.appendChild(modalClone);
    initModalButtons(fragment);
}

function detachModal(e) {
    const modalContainer = document.getElementById("modal").parentElement;
    while (modalContainer.lastChild) {
        modalContainer.removeChild(modalContainer.lastChild);
    }
    removeEventListener("keyup", detachModal);
}

function initModalButtons(modalParent) {
    const modalFragment = modalParent.children[0];
    // close when click X (on modal header)
    const xBtn = modalFragment.querySelector(".modal-header>button");
    xBtn.onclick = detachModal;
    // close when we click the "close" button
    const closeFormBtn = modalFragment.querySelector("#closeForm");
    closeFormBtn.addEventListener("click", function (e) {
        e.preventDefault();
        detachModal(e);
    });
    // close when we click on "Esc" key
    addEventListener("keyup", function (e) {
        if (e.key == "Escape") {
            detachModal(e);
        }
    });
    // close when we click outside the modal dialog
    // const modalOverlay = modalFragment.getElementById("modal");
    modalFragment.onclick = detachModal;
}
