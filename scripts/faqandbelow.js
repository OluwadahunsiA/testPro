const allFaq = document.querySelectorAll(".question__block__header__title");

function faqHandler(e) {
  this.nextElementSibling.classList.toggle("active");

  this.classList.toggle("active");
}

allFaq.forEach((faq) => {
  faq.addEventListener("click", faqHandler);
});
