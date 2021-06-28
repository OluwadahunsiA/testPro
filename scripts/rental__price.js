// const rentalSpace = {};
// This is in orders_modal
// GET ALL THE CARDS AGAIN

// LIFT THIS UP TO ORDERS_MODAL TO ACTIVATE FIRST RENTAL TIME
const allCardsWithRental = document.querySelectorAll(".photoCards");
let allRentalToActivate = allCardsWithRental;

allCardsWithRental.forEach((card) => {
  // THIS IS THE TOTAL COST FOR THE PARTICULAR CARD
  const totalPrice__rental = card.querySelector(".total__price");

  function rentalSearch(e) {
    // STOP PROPAGATION

    if (e.target.classList.contains("extraOptions__cards__customMark")) {
      e.stopPropagation();
      return;
    }

    // Get the totalPrice of the selected Card
    const currentRentalCard = e.target.parentElement.closest(".photoCards");

    // To stop active classFrom removing from the first rental
    allRentalToActivate.forEach((val) => {
      if (val !== card) {
        const rentals = val.querySelectorAll(".timeRent__frames--number");

        rentals[0].classList.add("active");
      }
    });

    // GET TOTAL FOR THE SELECTED CURRENT CARD THROUGH ITS ID
    // ///////////////////////////////////////////////////
    let currentCardTotal = currentRentalCard
      ? currentRentalCard.querySelector(".total__price")
      : "";
    currentCardTotal = currentCardTotal.id;

    // CONVERT IT TO NUMBER
    // ///////////////////////////////////////////////////
    let originalPrice = currentCardTotal
      ? +currentCardTotal.replace(/\D+/g, "")
      : "";

    // ADD ONLY THE SELECTED RENTAL DURATION. THERE CAN BE CHANGES IN SELECTION
    // THE PRICE OF EACH RENTAL HAS BEEN ADDED AS ID
    if (e.target.parentElement.classList.contains("timeRent__frames--number")) {
      if (
        e.target.parentElement.classList.contains("active") &
        !rentalSpace[e.target.parentElement.id]
      ) {
        rentalSpace[e.target.parentElement.id] = e.target.parentElement;

        // SINCE ALL THE INPUTS ADD THEIR VALUES TO NEWPRICE.KNOW IF THERE IS ALREADY A SUM FROM THE INPUT
        // AND IF THERE IS NONE, ADD THE SUM FROM RENTAL TO THE TOTAL SUM. NEWPRICE IS IN SCRIPT.JS

        newPrice =
          (newPrice ? newPrice : originalPrice) + +e.target.parentElement.id;
      }

      for (let key in rentalSpace) {
        if (!rentalSpace[key].classList.contains("active")) {
          newPrice =
            (newPrice ? newPrice : originalPrice) - +rentalSpace[key].id;
          delete rentalSpace[key];
        }
      }

      //   SET THE PRICE TO THE NEWPRICE GOTTEN FROM HERE
      setPrice(totalPrice__rental, newPrice);
    }
  }

  card.addEventListener("click", (e) => rentalSearch(e));
});
