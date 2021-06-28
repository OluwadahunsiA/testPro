// TRYING TO PREVENT MULTIPLE CLICKS

// PREVENT THE CHANGE OF A CARD'S TOTAL COST TO THE PARAMETER OF THE PREVIOUSLY CLICKED
const availableCards = document.querySelectorAll(".photoCards");

// let previousCard = "";
// let previousCardHolder = "";

let availableCards_copy = [];

availableCards.forEach((photoCard) => {
  function photoClick(e) {
    if (e.target.classList.contains("extraOptions__cards__customMark")) {
      e.stopPropagation();
      return;
    }
    // console.log();
    // let previousCardHolder = this;
    // let previousCard = this.querySelector(".cardTitle__number").innerText;

    // if (previousCard) {
    //   Array.from(availableCards).forEach((card) => {
    //     if (card !== this) {
    //       card.classList.add("removePointer");
    //     }
    //   });
    // }

    if (
      e.target.parentElement.classList.contains(
        "extraOptions__cards__check__input"
      ) ||
      e.target.parentElement.classList.contains("timeRent__frames--number") ||
      e.target.parentElement.classList.contains("extraOptions__cards__check") ||
      e.target.parentElement.classList.contains("timeRent__frames")
    ) {
      Array.from(availableCards).forEach((card) => {
        if (card !== e.target.parentElement.closest(".photoCards")) {
          card.classList.add("removePointer");
        }
      });
    }
  }
  photoCard.addEventListener("click", (e) => photoClick(e));
});
