const photoCardContent = document.querySelector(".cardSection");
let allCards = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
allCards.forEach((card) => {
  const price = 17500 + 100 * (card - 1);
  const displayPrice = price.toString();
  const firstPart = displayPrice.slice(0, 2);
  const secondPart = displayPrice.slice(2, displayPrice.length);
  const photo = document.createElement("section");
  photo.classList.add("photoCards");
  photo.innerHTML = `
  <section class="cards">
    <div class="card__images">
      <img class="card__image" src="./photo.jpeg" alt="card" />
      <img class="card__image" src="./photo.jpeg" alt="card" />
      <img class="card__image" src="./photo.jpeg" alt="card" />
      <img class="card__image" src="./photo.jpeg" alt="card" />
      <img class="card__image" src="./photo.jpeg" alt="card" />
    </div>
    <div class="card__image__arrow left">
      <img src="./left_arrow.svg" alt="left" />
    </div>
    <div class="card__image__arrow right">
      <img src="./right_arrow.svg" alt="right" />
    </div>
  </section>
  <div class="dots">
    <span class="dots__dot"></span>
    <span class="dots__dot long"></span>
    <span class="dots__dot"></span>
    <span class="activeDot"></span>
  </div>
  <div class="cardTitle">
    <h1 class="cardTitle__main card">
      Фотобудка с ширмой <span class="cardTitle__number card"></span>
    </h1>
    <p class="cardTitle__measurement card">Размер: 2м x 1.5м x 2м</p>
  </div>
  <!-- Extra Options -->
  <div class="extraOptions">
    <h2 class="extraOptions__title">Доп. опции</h2>
    <div class="extraOptions__cards">
    </div>
  </div>
  <div class="timeRent">
    <h1 class="timeRent__heading">Укажите время аренды</h1>
    <div class="timeRent__frames">
      <div class="timeRent__frames--number active" id = '0' data-d = '1'><p>1 час</p></div>
      <div class="timeRent__frames--number" id = '50' data-d = '2'><p>2 часа</p></div>
      <div class="timeRent__frames--number " id = '100' data-d = '3'><p>3 часа</p></div>
      <div class="timeRent__frames--number " id = '150' data-d = '4'><p>5 часов</p></div>
      <div class="timeRent__frames--number " id = '200' data-d = '5'><p>выставка 2 дня</p></div>
      <div class="timeRent__frames--number " id = '250' data-d = '6'><p>выставка 3 дня</p></div>
    </div>
  </div>
  <div class="total">
    <div class="total__price" id="${firstPart} ${secondPart}">${firstPart} ${secondPart} <i class="fa fa-ruble-sign"></i></div>
    <div class="total__invoice card"><p>Оставить заявку</p></div>
  </div>
  `;
  photoCardContent.appendChild(photo);
});
