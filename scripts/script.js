const play = document.querySelector(".video__image__control");
const modal = document.querySelector(".modalWindow");
const cancel = document.querySelector(".modalWindow__fas");
let newPrice = 0;
let totalPriceText = "";
const checkbox = document.querySelectorAll("input[name=checkbox]");
const cardNumbers = document.querySelectorAll(".cardTitle__number.card");
const numbers = document.querySelectorAll(".number");
const timeFrame = document.querySelectorAll(".timeRent__frames--number");
const photoCards = document.querySelectorAll(".photoCards");
const size = window.innerWidth - 63;
function playHandler(e) {
  modal.classList.remove("hide");
}
function cancelHandler(e) {
  modal.classList.add("hide");
  modal.querySelector(".video__image--player").setAttribute("src", "");
  setTimeout(() => {
    modal
      .querySelector(".video__image--player")
      .setAttribute(
        "src",
        "https://www.youtube.com/embed/CLeAjyNxjB4?autoplay=1"
      );
  }, 1000);
}
photoCards.forEach((card) => {
  const leftArrow = card.querySelector(".left");
  const rightArrow = card.querySelector(".right");
  const cardImages = card.querySelectorAll(".card__image");
  const cardImageContainer = card.querySelector(".card__images");
  const arr = Array.from(cardImages);
  const activeDot = card.querySelector(".activeDot");
  const longDot = card.querySelector(".dots__dot.long");
  const longDotWidth = +longDot.getBoundingClientRect().width;
  let counter = 0;
  function leftArrowHandler(e) {
    if (counter <= 0) {
      counter = 0;
      return;
    }
    counter === 0 ? (counter = 0) : counter--;
    cardImageContainer.style.transform = `translateX(${
      -size * (counter % arr.length)
    }px)`;
    activeDot.style.width = `${
      ((counter + 1) / cardImages.length) * (longDotWidth + 2)
    }px`;
  }
  function rightArrowHandler(e) {
    if (counter <= 0) {
      counter = 0;
    }
    counter === cardImages.length - 1 ? (counter = 0) : counter++;
    cardImageContainer.style.transform = `translateX(${
      -size * (counter % arr.length)
    }px)`;
    activeDot.style.width = `${
      ((counter + 1) / cardImages.length) * (longDotWidth + 2)
    }px`;
  }
  leftArrow.addEventListener("click", (e) => leftArrowHandler(e));
  rightArrow.addEventListener("click", (e) => rightArrowHandler(e));
  const individualCard = card.querySelector(".extraOptions__cards");
  const totalCard = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  totalCard.forEach((ele) => {
    const price = 17500 + 100 * (ele - 1);
    const displayPrice = price.toString();
    const firstPart = displayPrice.slice(0, 2);
    const secondPart = displayPrice.slice(2, displayPrice.length);
    const miniCards = document.createElement("div");
    miniCards.classList.add("extraOptions__cards__container");
    miniCards.innerHTML = `  <div class="extraOptions__cards__pic"></div>
      <div class="extraOptions__cards__text">
        <p class="extraOptions__cards__text__head">
          Разработка макета рамки <span class="number">#${ele}</span>
        </p>
        <p class="extraOptions__cards__text__price">
          от ${firstPart} ${secondPart} <i class="fa fa-ruble-sign"></i>
        </p>
      </div>
    
      <!-- For the input -->
      <label class="extraOptions__cards__check"  >
        <input type="checkbox" name="checkbox" class = "${ele} extraOptions__cards__check__input" />
        <span class="extraOptions__cards__checkmark">
          <img
            src=" ./check.svg"
            alt="check"
            class="extraOptions__cards__customMark"
          />
        </span>
      </label>`;
    individualCard.appendChild(miniCards);
  });
});
const clickedOptionPrice = document.querySelectorAll('input[name="checkbox"]');
function inputClickHandler(e) {
  const closestParent = e.target.parentElement;
  const topParent = closestParent.parentElement.firstElementChild;
  const topMostParent =
    topParent.parentElement.parentElement.parentElement.parentElement;
  const priceText = closestParent
    .closest("div")
    .querySelector(".extraOptions__cards__text__price");
  const inputPrice = getPrice(priceText);
  totalPriceText = topMostParent.querySelector(".total__price");
  const totalPrice = +getPrice(totalPriceText);
  newPrice = e.target.checked
    ? totalPrice + +inputPrice
    : totalPrice - +inputPrice;
  setPrice(totalPriceText, newPrice);
}
clickedOptionPrice.forEach((inp) => {
  inp.addEventListener("click", inputClickHandler);
});
function getPrice(element) {
  const price = element.innerText.replace(/\D+/g, "");
  return price;
}
function setPrice(element, addedprice) {
  const price = addedprice;
  const displayPrice = price.toString();
  const firstPart = displayPrice.slice(0, 2);
  const secondPart = displayPrice.slice(2, displayPrice.length);
  const sixFirstPart = displayPrice.slice(0, 3);
  const sixSecondPart = displayPrice.slice(3, displayPrice.length);
  const fiveDigits = `${firstPart} ${secondPart}`;
  const sixDigits = `${sixFirstPart} ${sixSecondPart}`;
  element.innerHTML = `${
    displayPrice.length < 6 ? fiveDigits : sixDigits
  } <i class="fa fa-ruble-sign"></i>`;
}
addNumbers(numbers);
addNumbers(cardNumbers);
function addNumbers(elements) {
  elements.forEach((element, idx) => {
    element.innerText = `#${idx + 1}`;
  });
}
function timeFrameHandler(e) {
  timeFrame.forEach((time) => {
    time.classList.remove("active");
  });
  this.classList.add("active");
}
play.addEventListener("click", playHandler);
cancel.addEventListener("click", cancelHandler);
timeFrame.forEach((time) => {
  time.addEventListener("click", timeFrameHandler);
});
