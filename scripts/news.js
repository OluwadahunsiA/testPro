const newsArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const newsContainer = document.querySelector(".news__container");
const newsList = document.querySelectorAll(".news__detail");
const moreButton = document.querySelector(".more__bar");

newsArray.forEach((news, idx) => {
  const newEle = document.createElement("div");
  newEle.classList.add("news");
  newEle.classList.add("hideNews");
  newEle.setAttribute("id", `${idx + 1}`);

  newEle.innerHTML = ` 
   <div class="news__photo">
  <img
    src="./news__photo.jpeg"
    alt="news"
    class="news__photo__image"
  />
  <img
    src="./news__arrow.svg"
    alt="arrow"
    class="news__photo__arrow"
  />
</div>

<div class="news__detail">
  <p class="news__detail__service">Услуги</p>
  <h1 class="news__detail__title">Фотобудки, GIF стойка</h1>
  <p class="news__detail__content">
    У нас есть широчайший ассортимент фотобудок на все случаи жизни
  </p>
  <p class="news__detail__date">20 марта 2021</p>
</div>`;

  newsContainer.appendChild(newEle);
});

const newEles = Array.from(document.querySelectorAll(".news"));

let showCount = 3;

function moreClickHandler() {
  newEles.forEach((ele, idx) => {
    if (idx < showCount) {
      ele.classList.remove("hideNews");
    }

    if (showCount > newEles.length) {
      moreButton.style.display = "none";
    }
  });

  showCount += 3;
}

moreClickHandler();

moreButton.addEventListener("click", (e) => moreClickHandler());

// Modal window
