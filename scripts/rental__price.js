const allCardsWithRental = document.querySelectorAll(".photoCards");
let allRentalToActivate = allCardsWithRental;
allCardsWithRental.forEach((card) => {
  const totalPrice__rental = card.querySelector(".total__price");
  function rentalSearch(e) {
    if (e.target.classList.contains("extraOptions__cards__customMark")) {
      e.stopPropagation();
      return;
    }
    const currentRentalCard = e.target.parentElement.closest(".photoCards");
    allRentalToActivate.forEach((val) => {
      if (val !== card) {
        const rentals = val.querySelectorAll(".timeRent__frames--number");

        rentals[0].classList.add("active");
      }
    });
    let currentCardTotal = currentRentalCard
      ? currentRentalCard.querySelector(".total__price")
      : "";
    currentCardTotal = currentCardTotal.id;
    let originalPrice = currentCardTotal
      ? +currentCardTotal.replace(/\D+/g, "")
      : "";
    if (e.target.parentElement.classList.contains("timeRent__frames--number")) {
      if (
        e.target.parentElement.classList.contains("active") &
        !rentalSpace[e.target.parentElement.id]
      ) {
        rentalSpace[e.target.parentElement.id] = e.target.parentElement;
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
      setPrice(totalPrice__rental, newPrice);
    }
  }
  card.addEventListener("click", (e) => rentalSearch(e));
});
