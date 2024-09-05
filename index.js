const goodsItems = document.querySelectorAll(".container-hero-goods-item");

goodsItems.forEach((item) => {
  item.addEventListener("mouseover", () => {
    item.classList.add("active");
    goodsItems.forEach((el) => {
      if (el !== item) {
        el.classList.add("inactive");
      }
    });
  });

  item.addEventListener("mouseout", () => {
    goodsItems.forEach((el) => {
      el.classList.remove("active", "inactive");
    });
  });
});

// decoration line

function createLineContent(lineElement, text, iconSrc) {
  const containerWidth = lineElement.offsetWidth;
  const singleItemWidth = 400;
  const numberOfItems = Math.ceil(containerWidth / singleItemWidth) + 2;
  lineElement.innerHTML = "";

  for (let i = 0; i < numberOfItems; i++) {
    const textElement = document.createElement("p");
    textElement.classList.add("decoration-line-text");
    textElement.textContent = text;

    const starElement = document.createElement("div");
    starElement.classList.add("decoration-line-star");
    const img = document.createElement("img");
    img.src = iconSrc;
    img.alt = "star";
    starElement.appendChild(img);

    lineElement.appendChild(textElement);
    lineElement.appendChild(starElement);
  }
}

function updateDecorationLines() {
  const line1 = document.querySelector(".decoration-line");
  const line2 = document.querySelector(".decoration-line-second");

  createLineContent(line1, "creating a great art", "img/star-icon.svg");
  createLineContent(line2, "creating a great art", "img/star-icon.svg");
}

window.addEventListener("resize", updateDecorationLines);

updateDecorationLines();

//price filtration
const filterBtn = document.querySelector(".goods-top-part-filters-btn");
const filerBody = document.querySelector(".goods-top-part-filters-body");

filterBtn.addEventListener("click", () => {
  filerBody.classList.toggle("display-none");
});

window.onload = function () {
  updateSlider();
};

const minValRange = document.querySelector(".min-val");
const maxValRange = document.querySelector(".max-val");

const priceInputMin = document.querySelector(".min-input");
const priceInputMax = document.querySelector(".max-input");

const minTooltip = document.querySelector(".min-tooltip");
const maxTooltip = document.querySelector(".max-tooltip");

const sliderTrack = document.querySelector(".slider-track");

const minGap = 100;

function updateSlider() {
  const min = parseInt(minValRange.value);
  const max = parseInt(maxValRange.value);

  if (max - min <= minGap) {
    if (event.target === minValRange) {
      minValRange.value = max - minGap;
    } else {
      maxValRange.value = min + minGap;
    }
  }

  priceInputMin.value = minValRange.value;
  priceInputMax.value = maxValRange.value;

  minTooltip.innerHTML = minValRange.value;
  maxTooltip.innerHTML = maxValRange.value;

  minTooltip.style.left = (minValRange.value / minValRange.max) * 100 + "%";
  maxTooltip.style.left = (maxValRange.value / maxValRange.max) * 100 + "%";

  sliderTrack.style.background = `linear-gradient(
    to right,
    #fff ${(minValRange.value / minValRange.max) * 100}%,
    #D9FF5A ${(minValRange.value / minValRange.max) * 100}%,
    #D9FF5A ${(maxValRange.value / maxValRange.max) * 100}%,
    #fff ${(maxValRange.value / maxValRange.max) * 100}%
  )`;
}

minValRange.addEventListener("input", updateSlider);
maxValRange.addEventListener("input", updateSlider);

priceInputMin.addEventListener("input", function () {
  minValRange.value = priceInputMin.value;
  updateSlider();
});

priceInputMax.addEventListener("input", function () {
  maxValRange.value = priceInputMax.value;
  updateSlider();
});

//goods render and filtration

const goodsList = document.querySelector(".goods-list");
const categories = document.querySelectorAll(".categories-list-item-btn");
const sectionGoods = document.querySelector(".goods");
const categoryQuantity = document.querySelector(
  ".goods-top-part-quantity-span"
);
const loadMore = document.querySelector(".goods-load-more");

let itemsPerPage = 5;
let currentItemCount = 0;
let filteredGoods = [];

sectionGoods.style.display = "none";
loadMore.style.display = "none";

function showItems() {
  const itemsToShow = filteredGoods.slice(
    currentItemCount,
    currentItemCount + itemsPerPage
  );
  itemsToShow.forEach((item) => {
    goodsList.innerHTML += `
      <li class="goods-list-item">
        <div class="goods-list-item-img">
          <img src="${item.img}" alt="${item.name}" />
        </div>
        <p class="goods-list-item-name">${item.name}</p>
        <p class="goods-list-item-desc">${item.desc}</p>
        <div class="goods-list-item-bottom-part">
          <p class="goods-list-item-bottom-part-price">
            ${item.price} <span>₽</span>
          </p>
          <button class="goods-list-item-bottom-part-buy">Купить</button>
        </div>
        <div class="goods-list-item-color" style="background-color: ${item.color};"></div>
      </li>
    `;
  });

  currentItemCount += itemsPerPage;

  if (currentItemCount >= filteredGoods.length) {
    loadMore.style.display = "none";
  }
}

function filterByCategory(category) {
  goodsList.innerHTML = "";

  currentItemCount = 0;

  filteredGoods = goods.filter((item) => item.category === category);

  categoryQuantity.textContent = filteredGoods.length;

  sectionGoods.style.display = "block";
  if (filteredGoods.length > itemsPerPage) {
    loadMore.style.display = "block";
  } else {
    loadMore.style.display = "none";
  }

  showItems();
}

categories.forEach((categoryItem) => {
  categoryItem.addEventListener("click", () => {
    const selectedCategory = categoryItem.dataset.category;
    filterByCategory(selectedCategory);
  });
});

loadMore.addEventListener("click", showItems);

//articles

const swiperWrapper = document.querySelector(".swiper-wrapper");
swiperWrapper.innerHTML = "";

articles.forEach((article) => {
  swiperWrapper.innerHTML += `
   <div class="swiper-slide">
              <div class="wrapper">
                <div class="wrapper-left-part">
                  <div class="wrapper-left-part-top-part">
                    <span class="wrapper-left-part-top-part-number"> ${article.number} </span>
                    <p class="wrapper-left-part-top-part-author">
                      ${article.author}
                    </p>
                  </div>
                  <h3 class="wrapper-left-part-header">
                    ${article.name}
                  </h3>
                  <span class="wrapper-left-part-date">${article.date} </span>
                </div>
                <div class="wrapper-right-part">
                  <img src=${article.img} alt=${article.name} />
                </div>
                <div class="wrapper-read-time">
                  <div class="wrapper-read-time-number">${article.readTime}</div>
                  <span>мин</span>
                </div>
              </div>
            </div>
  `;
});

// blog swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  mousewheel: true,
  keyboard: true,
  pagination: {
    el: ".swiper-pagination-left",
    type: "fraction",
    renderFraction: function (currentClass, totalClass) {
      return (
        '<span class="' +
        currentClass +
        '"></span>' +
        '<span class="hyphen"></span>' +
        '<span class="' +
        totalClass +
        '"></span>'
      );
    },
  },
  on: {
    init: function () {
      createBullets(this);
    },
    slideChange: function () {
      updateBullets(this);
    },
  },
});

function createBullets(swiper) {
  const bulletContainer = document.querySelector(".swiper-pagination");
  for (let i = 0; i < swiper.slides.length; i++) {
    const bullet = document.createElement("span");
    bullet.classList.add("swiper-bullet");
    bulletContainer.appendChild(bullet);
  }
  updateBullets(swiper);
}

function updateBullets(swiper) {
  const bullets = document.querySelectorAll(".swiper-bullet");
  bullets.forEach((bullet, index) => {
    bullet.classList.toggle(
      "swiper-bullet-active",
      index === swiper.activeIndex
    );
  });
}
