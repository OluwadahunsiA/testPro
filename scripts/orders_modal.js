const getAllCards = document.querySelectorAll(".photoCards");
const invoices = document.querySelectorAll(".total__invoice.card");
let optionSpace = {};
let rentalSpace = {};

// lift the main price and the total price

let liftedMain = 0;
let liftedTotal = 0;

// SELECT ALL THE AREAS THAT WILL CHANGE IN THE MODAL
const orderTitle = document.querySelector(".cardTitle__main.order");
const orderMeasurement = document.querySelector(
  ".cardTitle__measurement.order"
);
const orderCardPrice = document.querySelector(".current__order__price");

const orderMoreOptions = document.querySelector(".moreOptions");

const orderTotalPrice = document.querySelector(".totalCost__price");

// Add all the cost of the extra options and remove them from the total cost to get the initial cost.
let totalExtraOptionCost = 0;

// THIS FUNCTION IS USED TO CONVERT PRICE FROM NUMBER TO PRICE. IT IS THE MODIFIED VERSION OF SETPRICE
// IN THE SCRIPT.JS FILE. IT TAKES IN A SELECTED ELEMENT PRICEOPTION AS ARGUMENT

function setPriceForModal(priceOption) {
  const neededPrice = getPrice(priceOption);
  const displayPriceOption = neededPrice.toString();
  const firstPartOption = displayPriceOption.slice(0, 2);
  const secondPartOption = displayPriceOption.slice(
    2,
    displayPriceOption.length
  );
  const sixFirstPartOption = displayPriceOption.slice(0, 3);
  const sixSecondPartOption = displayPriceOption.slice(
    3,
    displayPriceOption.length
  );
  const fiveDigitsOption = `${firstPartOption} ${secondPartOption}`;
  const sixDigitsOption = `${sixFirstPartOption} ${sixSecondPartOption}`;
  return displayPriceOption.length < 6 ? fiveDigitsOption : sixDigitsOption;
}

// ////////////////////////////////////////////////////////////////////////////////////////

// KNOW THE EXACT CLICKED CARD
getAllCards.forEach((card) => {
  // GET THE TOTAL PRICE FOR THE CARD THIS IS STRICTLY FOR THE RENT PERIOD

  function mainCardClicked(e) {
    // TO STOP EVENT PROPAGATION ON CLICKING THE INPUT

    if (e.target.classList.contains("extraOptions__cards__customMark")) {
      e.stopPropagation();
      return;
    }

    // TO ADD ONLY THE SELECTED EXTRA OPTIONS INTO THE CART
    if (
      e.target.checked ||
      e.target.classList.contains("extraOptions__cards__check__input")
    ) {
      if (e.target.checked) {
        optionSpace[e.target.classList[0]] = e.target;
      } else if (!e.target.checked) {
        delete optionSpace[e.target.classList[0]];
      }
    }
  }
  // ////////////////////////////////////////////////////////////////////////////////////////

  card.addEventListener("click", (e) => mainCardClicked(e));
});

// ////////////////////////////////////////////////////////////////////////////////////////

// GET THE INVOICE BUTTON

invoices.forEach((invoice) => {
  // GET THE CARD CLICKED

  function invoiceClickHandler() {
    // SET THE INNERHTML OF THE MORE OPTIONS/CHOICES IN MODAL CARD TO EMPTY INITIALLY
    orderMoreOptions.innerHTML = "";
    const currentCard = invoice.parentElement.parentElement;

    // GET THE TOTAL COST ELEMENT OF THE CURRENT CARD

    for (key in optionSpace) {
      // GET THE NAME OF THE EXTRA OPTION CLICKED
      const nameOfOption = optionSpace[
        key
      ].parentElement.parentElement.querySelector(
        ".extraOptions__cards__text__head"
      ).innerText;

      //   GET THE PRICE OF THE EXTRA OPTION CLICKED
      const priceOfOption = optionSpace[
        key
      ].parentElement.parentElement.querySelector(
        ".extraOptions__cards__text__price"
      );

      const convertedOrderPrice = setPriceForModal(priceOfOption);

      //   CONVERT THE PRICE TO NUMBER. The function getPrice is in the script.js file
      const priceOfOptionToNumber = +getPrice(priceOfOption);

      //   ADD UP ALL THE COSTS OF THE EXTRA OPTIONS
      totalExtraOptionCost += priceOfOptionToNumber;

      //   REMOVE CHECKED FROM THE CLICKED EXTRA OPTIONS
      optionSpace[key].checked = false;

      //   APPEND EACH SELECTED OPTION INTO THE MODAL CARD

      const orderExtraOption = document.createElement("div");
      orderExtraOption.classList.add("chosenOptions");
      orderExtraOption.innerHTML = `  <p class="chosenOption__name">${nameOfOption}</p>
      <p class="chosenOption__price">
      ${convertedOrderPrice} <i class="fa fa-ruble-sign"></i>
      </p>
      `;

      orderMoreOptions.append(orderExtraOption);

      //   SET THE PRICE OF THE JUST APPENDED ELEMENT TO THE STRING VALUE

      //   REMOVE OPTION FROM THE EXTRA OPTION MEMORY
      delete optionSpace[key];
    }

    // GET THE ADDITIONAL OPTIONS CLICKED

    // GET ALL THE OTHER SELECTED

    const selectedCardTitle = currentCard.querySelector(".cardTitle__main");
    const selectedCardPrice = currentCard.querySelector(".total__price");
    const selectedCardMeasurement = currentCard.querySelector(
      ".cardTitle__measurement"
    );

    // CONVERT THE SELECTED TO TEXT
    const selectedTitle__text = selectedCardTitle.innerText;
    const selectedCardPrice__text = selectedCardPrice.innerText;
    const selectedCardMeasurement__text = selectedCardMeasurement.innerText;
    // GET ALL THE RENTAL TIMES AND KNOW THE SELECTED ONE

    const selectedCardPriceToNumber = +getPrice(selectedCardPrice);
    liftedTotal = selectedCardPriceToNumber;
    // const selectedCardPriceToString = setPriceForModal(selectedCardPrice);

    // INSERT EVERYTHING INTO THE NEW MODAL

    // FOR THE TITLE AND MEASUREMENT OF THE MAIN CARD
    orderTitle.innerText = selectedTitle__text;
    orderMeasurement.innerText = selectedCardMeasurement__text;

    // FOR THE MAIN PRICE
    let mainPrice = selectedCardPriceToNumber - totalExtraOptionCost;
    liftedMain = mainPrice;

    // SET THE MAIN PRICE OF THE CARD TO THE MODAL. The setPrice function is in the script.js file
    setPrice(orderCardPrice, mainPrice);

    // SET THE TOTAL PRICE OF THE MODAL. The setPrice function is in the script.js file
    setPrice(orderTotalPrice, selectedCardPriceToNumber);

    totalExtraOptionCost = 0;

    newPrice = 0;

    // GET ALL RENTAL TIME
    const parentRental = invoice.parentElement.closest(".photoCards");
    const allRental = Array.from(
      parentRental.querySelectorAll(".timeRent__frames--number")
    );

    allRental.forEach((rental) => {
      rental.classList.remove("active");
    });
    allRental[0].classList.add("active");

    // RESET THE COST BACK BY SUBTRACTING ADDED RENTAL TIME

    for (key in rentalSpace) {
      mainPrice = mainPrice - key;
      if (rentalSpace[key]) {
        // SELECT THE RENTAL DURATIONS ON THE CHECKOUT CARD
        const orderRentalDuration = document.getElementById(
          "standard-select order"
        );
        // GET THE CHECKOUT EQUIVALENT OF THE  CLICKED RENTAL DURATION
        const checkOut = document.getElementById(
          `option_${rentalSpace[key].getAttribute("data-d")}`
        );
        orderRentalDuration.value = checkOut.value;
      }
    }
    rentalSpace = {};
    // SET THE PRICE OF THE CARD BACK TO ORIGINAL VALUE
    setPrice(selectedCardPrice, mainPrice);

    // SET THE SELECTED RENTAL TIME TO THE VALUE IN MODAL

    // OPEN THE MODAL WINDOW FOR ORDER

    const orderWindow = document.querySelector(".modalWindow.total_order");

    // orderWindow.style.display = "block";
    orderWindow.classList.add("reveal");
    // REMOVE POINTER EVENTS FROM ALL THE ELEMENTS AND MAKE THEM SELECTABLE
    Array.from(getAllCards).forEach((card) => {
      if (card.classList.contains("removePointer")) {
        card.classList.remove("removePointer");
      }
    });
  }

  invoice.addEventListener("click", invoiceClickHandler);
});
