const sortOption = document.getElementById("standard-select");
const container = [];
allCards = [];
const cardsToSort = Array.from(document.querySelectorAll(".photoCards"));
cardsToSort.forEach((card) => {
  const cardPriceElement = card.querySelector(".total__price");
  const cost = +cardPriceElement.id.replace(/\D+/g, "");
  const arrayContainer = {};
  arrayContainer.cost = cost;
  arrayContainer.card = card;
  container.push(arrayContainer);
});
function getSortValue() {
  if (this.value === "По убыванию цены") {
    container.sort((a, b) => {
      return b.cost - a.cost;
    });
    photoCardContent.innerHTML = "";
    container.forEach((cont) => {
      photoCardContent.appendChild(cont.card);
    });
  } else if (this.value === "По возрастанию цены") {
    container.sort((a, b) => {
      return a.cost - b.cost;
    });
    photoCardContent.innerHTML = "";
    container.forEach((cont) => {
      photoCardContent.appendChild(cont.card);
    });
  }
}
sortOption.addEventListener("change", getSortValue);
