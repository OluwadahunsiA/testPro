const play = document.querySelector(".video__image__control");
const modal = document.querySelector(".modalWindow");
const cancel = document.querySelector(".modalWindow__fas");

// LIFT TOTAL PRICE

let newPrice = 0;
let totalPriceText = "";

// Total Display Price

// Input checkbox
const checkbox = document.querySelectorAll("input[name=checkbox]");

// Card title number

const cardNumbers = document.querySelectorAll(".cardTitle__number.card");

// Options title number

const numbers = document.querySelectorAll(".number");

// Time frame

const timeFrame = document.querySelectorAll(".timeRent__frames--number");

// For photCards

const photoCards = document.querySelectorAll(".photoCards");

// Generally needed for sliding images.

const size = window.innerWidth - 63;

// For the video

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

// This is for the sliding photos in the Photobuds section.

photoCards.forEach((card) => {
  const leftArrow = card.querySelector(".left");
  const rightArrow = card.querySelector(".right");
  const cardImages = card.querySelectorAll(".card__image");
  const cardImageContainer = card.querySelector(".card__images");

  const arr = Array.from(cardImages);

  // slide dots

  const activeDot = card.querySelector(".activeDot");
  const longDot = card.querySelector(".dots__dot.long");

  const longDotWidth = +longDot.getBoundingClientRect().width;

  let counter = 0;

  function leftArrowHandler(e) {
    if (counter <= 0) {
      counter = 0;
      return;
    }

    //   For the sliding images
    counter === 0 ? (counter = 0) : counter--;
    cardImageContainer.style.transform = `translateX(${
      -size * (counter % arr.length)
    }px)`;

    //   For the dots
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

  //   INSERT EACH SMALL CARD INTO THE CARD SPACE

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
    
      <!-- For the input   // /------------------------- -->
     
      <div class="extraOptions__cards__check"  >
        <div  class = "${ele} extraOptions__cards__check__input" >
        <span class="extraOptions__cards__checkmark">
          <img
          loading="lazy"
            src=" ./check.svg"
            alt="check"
            class="${ele} extraOptions__cards__customMark"
          />
        </span>
        </div>
      </div>`;
    individualCard.appendChild(miniCards);
  });
});

// For the input buttons inside each card (to increase price)
// /////////////////////////////////////////////////////-------------------------

const clickedOptionPrice = document.querySelectorAll(
  ".extraOptions__cards__check"
);

// This is to get price from the clicked input

function inputClickHandler(e) {
  //   if (e.target.checked) {
  //   }

  clickedBoxCustomMark = this.querySelector(".extraOptions__cards__customMark");
  clickedBoxCustomMark.classList.toggle("activeInput");

  const closestParent = this.parentElement;

  const topParent = closestParent.parentElement.firstElementChild;
  const topMostParent = topParent.closest(".photoCards");
  const priceText = this.parentElement.querySelector(
    ".extraOptions__cards__text__price"
  );

  const inputPrice = getPrice(priceText);

  // Lift this too and use it

  totalPriceText = topMostParent.querySelector(".total__price");

  const totalPrice = +getPrice(totalPriceText);

  // lift new price up

  newPrice = clickedBoxCustomMark.classList.contains("activeInput")
    ? totalPrice + +inputPrice
    : totalPrice - +inputPrice;

  //   To add input price to the total price
  setPrice(totalPriceText, newPrice);
}

// Add event Listener for all the inputs
clickedOptionPrice.forEach((inp) => {
  inp.addEventListener("click", inputClickHandler);
});

// function to get the next element sibling.

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

// Add Numbers to entries
addNumbers(numbers);
addNumbers(cardNumbers);

function addNumbers(elements) {
  elements.forEach((element, idx) => {
    element.innerText = `#${idx + 1}`;
  });
}

// Choose THE RENT TIME FRAME

function timeFrameHandler(e) {
  timeFrame.forEach((time) => {
    time.classList.remove("active");
  });
  this.classList.add("active");
}

// Event Listeners

play.addEventListener("click", playHandler);
cancel.addEventListener("click", cancelHandler);
timeFrame.forEach((time) => {
  time.addEventListener("click", timeFrameHandler);
});
