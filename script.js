const nav = document.querySelector(".nav");
const openBtn = document.querySelector(".fa-bars");
const closeBtn = document.querySelector(".fa-xmark");

const pages = document.querySelectorAll(".page");
const items = document.querySelectorAll(".items");

let currentPageIndex = 2;
let isAnimating = false;

function isMobileOrTablet() {
  return window.innerWidth <= 1024;
}

openBtn.addEventListener("click", function () {
  nav.classList.add("active");
});

closeBtn.addEventListener("click", function () {
  nav.classList.remove("active");
});

const tl = gsap.timeline();

function initializePages() {
  if (isMobileOrTablet()) {
    pages.forEach((page) => {
      gsap.set(page, { position: "static" });
    });
  } else {
    pages.forEach((page, index) => {
      if (index === currentPageIndex) gsap.set(page, { y: 0 });
      else gsap.set(page, { y: 1000 });
    });
    items[currentPageIndex].classList.add("item-active");
  }
}

initializePages();

window.addEventListener("resize", function () {
  initializePages();
});

function animateToPage(targetIndex) {
  if (isMobileOrTablet()) {
    const targetPage = pages[targetIndex];
    targetPage.scrollIntoView({ behavior: "smooth" });
    return;
  }

  if (targetIndex === currentPageIndex || isAnimating) return;

  isAnimating = true;

  const currentPage = pages[currentPageIndex];
  const targetPage = pages[targetIndex];

  items[currentPageIndex].classList.remove("item-active");
  items[targetIndex].classList.add("item-active");

  const tl = gsap.timeline({
    onComplete: () => {
      currentPageIndex = targetIndex;
      isAnimating = false;
    },
  });

  if (targetIndex > currentPageIndex) {
    // Animate down (next page)
    tl.to(currentPage, { y: 1000, duration: 0.5, ease: "power2.inOut" }).to(
      targetPage,
      { y: 0, duration: 0.8, ease: "power2.inOut" },
      "-=0.4"
    );
  } else {
    // Animate up (previous page)
    tl.to(currentPage, { y: 1000, duration: 0.5, ease: "power2.inOut" }).to(
      targetPage,
      { y: 0, duration: 0.8, ease: "power2.inOut" },
      "-=0.4"
    );
  }
}

items.forEach((item, index) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    nav.classList.remove("active");

    const href = item.querySelector("a").getAttribute("href");
    let targetIndex = 0;

    switch (href) {
      case "#home":
        targetIndex = 0;
        break;
      case "#education":
        targetIndex = 1;
        break;
      case "#projects":
        targetIndex = 2;
        break;
      case "#skills":
        targetIndex = 3;
        break;
      case "#contact":
        targetIndex = 4;
        break;
      default:
        targetIndex = 0;
    }

    console.log(targetIndex);

    animateToPage(targetIndex);
  });
});

document.addEventListener("keydown", function (e) {
  if (isMobileOrTablet()) return;

  if (e.key === "ArrowDown" && currentPageIndex < pages.length - 1) {
    animateToPage(currentPageIndex + 1);
  } else if (e.key === "ArrowUp" && currentPageIndex > 0) {
    animateToPage(currentPageIndex - 1);
  }
});

document.addEventListener("wheel", function (e) {
  if (isMobileOrTablet()) return;

  e.preventDefault();

  if (e.deltaY > 0 && currentPageIndex < pages.length - 1) {
    animateToPage(currentPageIndex + 1);
  } else if (e.deltaY < 0 && currentPageIndex > 0) {
    animateToPage(currentPageIndex - 1);
  }
});


// Slider js
const swiper = new Swiper('.mySwiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 30,
  centeredSlides: false,
  autoplay: {
    delay: 1,
    disableOnInteraction: false,
    reverseDirection: false,
  },
  speed: 3000,
  allowTouchMove: true,
  simulateTouch: true,

  // Responsive breakpoints
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },

  // Effects
  effect: 'slide',
  
  // Grab cursor
  grabCursor: true,
});
