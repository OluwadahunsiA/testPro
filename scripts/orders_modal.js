const getAllCards = document.querySelectorAll(".photoCards");
const invoices = document.querySelectorAll(".total__invoice.card");
let optionSpace = {};
let rentalSpace = {};
let liftedMain = 0;
let liftedTotal = 0;
const orderTitle = document.querySelector(".cardTitle__main.order");
const orderMeasurement = document.querySelector(
  ".cardTitle__measurement.order"
);
const orderCardPrice = document.querySelector(".current__order__price");
const orderMoreOptions = document.querySelector(".moreOptions");
const orderTotalPrice = document.querySelector(".totalCost__price");
let totalExtraOptionCost = 0;
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
getAllCards.forEach((card) => {
  function mainCardClicked(e) {
    // if (e.target.classList.contains("extraOptions__cards__customMark")) {
    //   e.stopPropagation();
    //   return;
    // }
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
  card.addEventListener("click", (e) => mainCardClicked(e));
});
invoices.forEach((invoice) => {
  function invoiceClickHandler() {
    orderMoreOptions.innerHTML = "";
    const currentCard = invoice.parentElement.parentElement;
    for (key in optionSpace) {
      const nameOfOption = optionSpace[
        key
      ].parentElement.parentElement.querySelector(
        ".extraOptions__cards__text__head"
      ).innerText;
      const priceOfOption = optionSpace[
        key
      ].parentElement.parentElement.querySelector(
        ".extraOptions__cards__text__price"
      );
      const convertedOrderPrice = setPriceForModal(priceOfOption);
      const priceOfOptionToNumber = +getPrice(priceOfOption);
      totalExtraOptionCost += priceOfOptionToNumber;
      optionSpace[key].checked = false;
      const orderExtraOption = document.createElement("div");
      orderExtraOption.classList.add("chosenOptions");
      orderExtraOption.innerHTML = `  <p class="chosenOption__name">${nameOfOption}</p>
      <p class="chosenOption__price">
      ${convertedOrderPrice} <i class="fa fa-ruble-sign"></i>
      </p>
      `;
      orderMoreOptions.append(orderExtraOption);
      delete optionSpace[key];
    }
    const selectedCardTitle = currentCard.querySelector(".cardTitle__main");
    const selectedCardPrice = currentCard.querySelector(".total__price");
    const selectedCardMeasurement = currentCard.querySelector(
      ".cardTitle__measurement"
    );
    const selectedTitle__text = selectedCardTitle.innerText;
    const selectedCardPrice__text = selectedCardPrice.innerText;
    const selectedCardMeasurement__text = selectedCardMeasurement.innerText;
    const selectedCardPriceToNumber = +getPrice(selectedCardPrice);
    liftedTotal = selectedCardPriceToNumber;
    orderTitle.innerText = selectedTitle__text;
    orderMeasurement.innerText = selectedCardMeasurement__text;
    let mainPrice = selectedCardPriceToNumber - totalExtraOptionCost;
    liftedMain = mainPrice;
    setPrice(orderCardPrice, mainPrice);
    setPrice(orderTotalPrice, selectedCardPriceToNumber);
    totalExtraOptionCost = 0;
    newPrice = 0;
    const parentRental = invoice.parentElement.closest(".photoCards");
    const allRental = Array.from(
      parentRental.querySelectorAll(".timeRent__frames--number")
    );

    allRental.forEach((rental) => {
      rental.classList.remove("active");
    });
    allRental[0].classList.add("active");
    for (key in rentalSpace) {
      mainPrice = mainPrice - key;
      if (rentalSpace[key]) {
        const orderRentalDuration = document.getElementById(
          "standard-select order"
        );
        const checkOut = document.getElementById(
          `option_${rentalSpace[key].getAttribute("data-d")}`
        );
        orderRentalDuration.value = checkOut.value;
      }
    }
    rentalSpace = {};
    setPrice(selectedCardPrice, mainPrice);
    const orderWindow = document.querySelector(".modalWindow.total_order");
    orderWindow.classList.add("reveal");
    Array.from(getAllCards).forEach((card) => {
      if (card.classList.contains("removePointer")) {
        card.classList.remove("removePointer");
      }
    });
  }

  invoice.addEventListener("click", invoiceClickHandler);
});
