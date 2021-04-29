//sub-card headers
const subCardHeaders = ["Liters Filled", "KMs from last refuel", "Gas Station", "Gas Station ID", "comments"];

// list modifiers
const createRecordBtn = document.getElementById("createRecord");

// list
const refuelList = document.querySelector(".list-container");
const card = document.querySelector(".row-extendable-card");
const editBtn = document.getElementById("edit");

document.addEventListener("DOMContentLoaded", loadRefuelsFromStorage);

refuelList.addEventListener("click", function (event) {
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

editBtn.addEventListener("click", (e) => {
  const editCardBtn = document.querySelectorAll(".edit-card-btn");
  editCardBtn.forEach((o) => {
    const isHidden = o.hasAttribute("hidden");
    if (isHidden) {
      o.removeAttribute("hidden");
    } else {
      o.setAttribute("hidden", "");
    }
  });
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

function detachModal() {
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
    detachModal();
  });
  // close when we click on "Esc" key
  addEventListener("keyup", function (e) {
    if (e.key == "Escape") {
      detachModal();
    }
  });
  // close when we click outside the modal dialog
  // const modalOverlay = modalFragment.getElementById("modal");
  modalFragment.onclick = (e) => {
    if (e.target.id == "modal") {
      detachModal();
    }
  };
}

function initAddItemBtn(modalParent) {
  const modalFragment = modalParent.children[0];
  const addBtn = modalFragment.querySelector("#newItemForm");
  addBtn.addEventListener("submit", function (e) {
    const refuelData = dataValidation(modalFragment);
    if (refuelData !== undefined) {
      createExtendableCard(refuelData);
      addRefuelToStorage(refuelData);
      detachModal();
      e.preventDefault();
    }
  });
}

function dataValidation(modalFragment) {
  const refuelData = {
    date: modalFragment.querySelector("#refuelDate"),
    liters: modalFragment.querySelector("#litersAmount"),
    kms: modalFragment.querySelector("#kmFromLastRefuel"),
    totalPaid: modalFragment.querySelector("#amountPaid"),
    gasStation: modalFragment.querySelector("#gasStation"),
    gasStationID: modalFragment.querySelector("#gasStationId"),
    comments: modalFragment.querySelector("#comments"),
  };
  for (let field in refuelData) {
    if (refuelData[field].hasAttribute("required") && isStringEmptyOrNull(refuelData[field].value) == true) {
      return undefined;
    } else {
      refuelData[field] = refuelData[field].value;
    }
  }
  return refuelData;
}

function createExtendableCard(refuelData) {
  const extendableCard = document.createElement("div");
  extendableCard.classList.add("row-extendable-card");
  const collapsedCard = attachCollapsed(refuelData.date, refuelData.totalPaid);
  const subCard = attachSubCard([
    refuelData.liters,
    refuelData.kms,
    refuelData.gasStation,
    refuelData.gasStationID,
    refuelData.comments,
  ]);
  extendableCard.appendChild(collapsedCard);
  extendableCard.appendChild(subCard);
  refuelList.appendChild(extendableCard);
}

function attachCollapsed(date, price) {
  const collapsedDiv = document.createElement("div");
  collapsedDiv.className = "card-collapsed bg-secondary-trans bold-secondary-border";
  const collapsedHeading = document.createElement("div");
  collapsedHeading.className = "collapsed-heading";
  collapsedHeading.appendChild(document.createElement("input"));
  setAttributes(collapsedHeading.children[0], {
    type: "checkbox",
    name: "added-item",
    class: "check-box checkbox-v-gr",
  });
  const collapsedHeader = document.createElement("h3");
  collapsedHeader.appendChild(document.createTextNode(date));
  collapsedHeading.appendChild(collapsedHeader);
  const collapsedFooter = document.createElement("div");
  collapsedFooter.className = "collapsed-footer";
  collapsedFooter.innerHTML = `<p>${price} ₪</p>`;
  const editCard = document.createElement("button");
  editCard.innerHTML = "Edit";
  editCard.className = "edit-card-btn btn btn-yellow";
  editCard.setAttribute("hidden", "");
  collapsedFooter.appendChild(editCard);
  collapsedDiv.appendChild(collapsedHeading);
  collapsedDiv.appendChild(collapsedFooter);
  return collapsedDiv;
}

function attachSubCard(footerData) {
  let flexCol;
  const subCardRoot = document.createElement("div");
  subCardRoot.className = "sub-card bg-secondary-trans";
  const subCardContent = subCardRoot.appendChild(document.createElement("div"));
  subCardContent.className = "sub-card-content";
  const subCardGrid = subCardContent.appendChild(document.createElement("div"));
  subCardGrid.className = "flex-grid";

  // TODO: Arrow function - to read
  footerData.forEach((item, index) => {
    if (item != undefined) {
      if (index % 2 == 0) {
        flexCol = createFlexCol();
        subCardGrid.appendChild(flexCol);
      }
      const verticalGroup = createVerticalGroup(subCardHeaders[index] + ":", item);
      flexCol.appendChild(verticalGroup);
    }
  });
  return subCardRoot;
}

function createFlexCol() {
  const flexCol = document.createElement("div");
  flexCol.className = "flex-col";
  return flexCol;
}

function createVerticalGroup(header, input) {
  const subject = document.createElement("div");
  subject.className = "info-subject";
  subject.appendChild(document.createTextNode(header));
  const content = document.createElement("div");
  content.className = "info-content";
  content.appendChild(document.createTextNode(input));
  const verticalGroup = document.createElement("div");
  verticalGroup.className = "vertical-group";
  verticalGroup.appendChild(subject);
  verticalGroup.appendChild(content);
  return verticalGroup;
}

function setAttributes(element, attrs) {
  for (let key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
}

function getFormattedDate(date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

function isStringEmptyOrNull(string) {
  const str = string.trim();
  return !str | (str === "");
}

// !! NOT IN USE
// function showCustomValidityErrorMsg(inputElement) {
//   inputElement.setCustomValidity("This field is required");
// }

// function showInputErrorMsg(elm, msg) {
//   const sib = elm.nextElementSibling;
//   if (sib !== undefined) {
//     if (sib.classList.contains("display-none")) {
//       sib.classList.remove("display-none");
//       sib.classList.add("display-inline");
//     } else {
//       sib.classList.remove("display-inline");
//       sib.classList.add("display-none");
//     }
//   }
// }

function loadRefuelsFromStorage() {
  let savedRefuels;
  if (localStorage.getItem("refuelList") !== null) {
    savedRefuels = JSON.parse(localStorage.getItem("refuelList"));
    for (let i = 0; i < savedRefuels.length; i++) {
      createExtendableCard(savedRefuels[i]);
    }
  }
}

function addRefuelToStorage(refuelData) {
  let refuels;
  if (localStorage.getItem("refuelList") === null) {
    refuels = [];
  } else {
    refuels = JSON.parse(localStorage.getItem("refuelList"));
  }
  refuels.push(refuelData);
  localStorage.setItem("refuelList", JSON.stringify(refuels));
}
