// GENERATE DIFFERENT MODALS FOR EACH NEWS
const newsModal = document.querySelector(".news__modal");
const moreNews = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  17: 17,
  18: 18,
  19: 19,
  20: 20,
};
const newsModalToDisplay = {};
for (const key in moreNews) {
  const modalHTML = document.createElement("div");
  modalHTML.innerHTML = `    
  <div class="modalWindow rebrand" id=${key}>
<div class = 'modalResize'>
  <section class="photocards rebrand">
    <div class="cards__stop__over rebrand">
      <section class="card__rebrand">
        <div class="card__images rebrand">
          <img class="card__image rebrand" src="./photo.jpeg" alt="card" />
          <img class="card__image rebrand" src="./photo.jpeg" alt="card" />
          <img class="card__image rebrand" src="./photo.jpeg" alt="card" />
          <img class="card__image rebrand" src="./photo.jpeg" alt="card" />
          <img class="card__image rebrand" src="./photo.jpeg" alt="card" />
        </div>
        <div class="card__image__arrow left rebrand">
          <img src="./left_arrow.svg" alt="left" />
        </div>
        <div class="card__image__arrow right rebrand">
          <img src="./right_arrow.svg" alt="right" />
        </div>
        <div class="card__image__arrow rebrand cancel" id=${key}>
          <img src="./cancel.svg" alt="cancel" />
        </div>
      </section>
      <div class="dots rebrand">
        <span class="dots__dot rebrand"></span>
        <span class="dots__dot long rebrand"></span>
        <span class="dots__dot rebrand"></span>
        <span class="activeDot rebrand"></span>
      </div>
      <!-- Text  -->
      <div class="color"></div>
      <div class="modal__news__content">
        <div class="news__modal__detail">
          <div class="news__modal__first">
            <div class="news__modal__detail__mini">Фотобудка</div>
            <p class="news__modal__detail__date">20 марта 2021</p>
          </div>
          <div class="news__modal__content__feed">
            <h1 class="news__modal__content__main">Название события</h1>
            <div class="news__modal__content__text">
              <p>
                Lorem ipsum dolor sit amet, consectetur
                <a>adispiscing elit,</a> sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Temporibus dolore nam
                aspernatur, voluptate fugit minus totam facere ducimus!
                Illum, quam facere sapiente numquam minima vero omnis
                reiciendis delectus neque optio temporibus obcaecati
                inventore perspiciatis quo dolore quos. Temporibus,
                laboriosam repudiandae.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</div>`;
  newsModal.appendChild(modalHTML);
}
const selectModals = document.querySelectorAll(".modalWindow.rebrand");
const modalLength = Array.from(selectModals).length;
selectModals.forEach((modal) => {
  let singleCard = modal.querySelector(".photocards.rebrand");
  const leftArrow = singleCard.querySelector(".left");
  const rightArrow = singleCard.querySelector(".right");
  const cardImages = singleCard.querySelectorAll(".card__image");
  const cardImageContainer = singleCard.querySelector(".card__images");
  const arr = Array.from(cardImages);
  const activeDot = singleCard.querySelector(".activeDot");
  const longDot = singleCard.querySelector(".dots__dot.long");
  const longDotWidth = 3.4;
  let counter = 0;
  const modalSize = window.innerWidth - 45.9;
  function leftArrowHandler(e) {
    if (counter <= 0) {
      counter = 0;
      return;
    }
    counter === 0 ? (counter = 0) : counter--;
    cardImageContainer.style.transform = `translateX(${
      -(modalSize + (counter % arr.length)) * (counter % arr.length)
    }px)`;
    activeDot.style.width = `${
      ((counter % modalLength) + 1) * (longDotWidth + 2)
    }px`;
  }
  function rightArrowHandler(e) {
    if (counter <= 0) {
      counter = 0;
    }
    counter === cardImages.length - 1 ? (counter = 0) : counter++;
    cardImageContainer.style.transform = `translateX(${
      -(modalSize + (counter % arr.length)) * (counter % arr.length)
    }px)`;
    activeDot.style.width = `${
      ((counter % modalLength) + 1) * (longDotWidth + 2)
    }px`;
  }
  leftArrow.addEventListener("click", (e) => leftArrowHandler(e));
  rightArrow.addEventListener("click", (e) => rightArrowHandler(e));
  newsModalToDisplay[modal.id] = modal;
});
const allMainNews = document.querySelectorAll(".news");
allMainNews.forEach((news) => {
  function clickNewsHandler() {
    newsModalToDisplay[this.id].style.display = "block";
  }
  news.addEventListener("click", clickNewsHandler);
});
const cancelKeys = document.querySelectorAll(
  ".card__image__arrow.rebrand.cancel"
);
cancelKeys.forEach((key, idx) => {
  function cancelKeyHandler() {
    newsModalToDisplay[this.id].style.display = "none";
  }
  key.addEventListener("click", cancelKeyHandler);
});
