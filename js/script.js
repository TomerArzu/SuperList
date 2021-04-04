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
  modalHeader.insertBefore(headingNode, modalClone.querySelector("#m-header>[data-close]"));
  modalContent.appendChild(content);
  fragment.appendChild(modalClone);
  initCloseModalButtons(fragment);
  initAddItemBtn(fragment);
}

function detachModal(e) {
  const modalContainer = document.getElementById("modal").parentElement;
  while (modalContainer.lastChild) {
    modalContainer.removeChild(modalContainer.lastChild);
  }
  removeEventListener("keyup", detachModal);
}

function initCloseModalButtons(modalParent) {
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
  modalFragment.onclick = (e) => {
    if (e.target.id == "modal") {
      detachModal(e);
    }
  };

  function addExtendableCard() {}
}

function initAddItemBtn(modalParent) {
  const modalFragment = modalParent.children[0];
  const addBtn = modalFragment.querySelector("#addItemBtn");
  addBtn.addEventListener("click", function (e) {
    const refuelData = [{
      collapsedCardDate = {
        date: getFormattedDate(new Date(modalFragment.querySelector("#refuelDate").value)),
        liters: modalFragment.querySelector("#litersAmount").value
      },
      subCardDate = {
        kms: modalFragment.querySelector("#kmFromLastRefuel").value,
        totalPaid: modalFragment.querySelector("#amountPaid").value,
        gasStation: modalFragment.querySelector("#gasStation").value,
        gasStationCity: modalFragment.querySelector("#gasStationCity").value,
        comments: modalFragment.querySelector("#comments").value
      }
    }];
    createExtendableCard(refuelData);
    e.preventDefault();
  });
}

function createExtendableCard(refuelData) {
  const extendableCard = document.createElement("div");
  extendableCard.classList.add("row-extendable-card");
  const collapsedCard = attachCollapsed(refuelData.date, refuelData.totalPaid);
  const subCard = attachSubCard(refuelData.listers, refuelData.kms, refuelData.gasStation, refuelData.gasStationCity, refuelData.comments);
  extendableCard.appendChild(collapsedCard);
  extendableCard.appendChild(subCard);
}

function attachCollapsed(date, price) {
  const collapsedDiv = document.createElement("div");
  collapsedDiv.className = "card-collapsed bg-secondary-trans bold-secondary-border";
  const collapsedHeading = document.createElement("div");
  collapsedHeading.className = "card-heading";
  collapsedHeading.appendChild(document.createElement("input"));
  setAttributes(collapsedHeading.children[0], {
    type: "checkbox",
    name: "added-item",
    class: "check-box checkbox-v-gr",
  });
  const collapsedHeader = document.createElement("h3");
  collapsedHeader.innerText = getFormattedDate(date);
  collapsedHeading.appendChild(collapsedHeader);
  const collapsedFooter = document.createElement("div");
  collapsedFooter.className = "card-footer";
  collapsedFooter.innerHTML = `<p>${price}</p`;
  collapsedDiv.appendChild(collapsedHeading);
  collapsedDiv.appendChild(collapsedFooter);
  return collapsedDiv;
}

function attachSubCard(listers, kms, gasStation, gasStationCity, comments) {
  const subCardRoot = document.createElement("div");
  subCardRoot.className = "sub-card bg-secondary-trans";
  const subCardContent = subCardRoot.appendChild(document.createElement("div"));
  subCardContent.className = "sub-card-content";
  const subCardGrid = subCardContent.appendChild(document.createElement("div"));
  subCardGrid.className = "flex-grid";
  createFlexColWithVerticalGroup({})
}

function createFlexColWithVerticalGroup(){
  const flexCol = document.createElement("div");
  flexCol.className = flex-col;
}

// TODO: continue from here : think of how to create sub-card
function createVerticalGroup(header, input){
  return `<div class="info-subject">${}</div>
          <div class="info-content">${}</div>`
}

function setAttributes(element, attrs) {
  for (let key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
}

function getFormattedDate(date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}
