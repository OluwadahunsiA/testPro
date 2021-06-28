// GET ALL THE MODAL OPTIONS

const modalOptions = document.querySelector(".select.order select");

// GET THE MAIN MODAL COST

const mainModalCost = document.querySelector(".current__order__price");

// GET THE TOTAL MODAL COST

const modalTotalCost = document.querySelector(".totalCost__price");

// GET MODAL CANCEL BUTTON AND SEND ORDER BUTTON

const orderModalWindow = document.querySelector(".modalWindow.total_order");

const modalCancel = document.querySelector(".cancel__order");
const modalSend = document.querySelector(".total__invoice.checkout");

// CONVERT PRICE TO NUMBER. FROM SCRIPT.JS
let currentMainModalCost = +getPrice(mainModalCost);

let currentModalTotalCost = +getPrice(modalTotalCost);

const costs = {
  "1 час": 0,
  "2 часа": 50,
  "3 часа": 100,
  "5 часов": 150,
  "2 дня": 200,
  "3 дня": 250,
};

// GET THE PREVIOUS VALUE AND CURRENT VALUE
let previousValue = "";

function changeHandler() {
  //   DEDUCT THE CHANGED PRICE FROM TOTAL PRICE

  liftedMain = liftedMain - costs[previousValue];
  liftedTotal = liftedTotal - costs[previousValue];

  liftedMain = liftedMain + costs[this.value];
  liftedTotal = liftedTotal + costs[this.value];

  setPrice(mainModalCost, liftedMain);
  setPrice(modalTotalCost, liftedTotal);

  previousValue = this.value;
}

// GET THE INITIAL PREVIOUS VALUE

function getHandler() {
  previousValue = this.value;
}

function orderModalClose() {
  // orderModalWindow.style.display = "none";
  orderModalWindow.classList.remove("reveal");
  modalOptions.selectedIndex = 0;
}
function orderModalSend() {
  // orderModalWindow.style.display = "none";
  orderModalWindow.classList.remove("reveal");
  modalOptions.selectedIndex = 0;
}

modalOptions.addEventListener("change", changeHandler);
modalOptions.addEventListener("focus", getHandler);

modalCancel.addEventListener("click", orderModalClose);
modalSend.addEventListener("click", orderModalSend);
