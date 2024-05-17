// Select elements
const pages = document.querySelectorAll(".page");
const navigationButtons = document.querySelectorAll(".navigation-btn");
const allLinks = document.querySelectorAll(".navbar ul li a");
const body = document.querySelector("body");
const hambergerBtn = document.querySelector(".hamburger-btn");
const homaPagesections = document.querySelectorAll(".section-container");
const navbarMenu = document.querySelector("#navbar ul.navbar-menu");
const navbarMenuMobile = document.querySelector(
  "#navbar ul.navbar-menu-mobile"
);
const homePageButtons = document.querySelector("#home-page .page-container");
const navBarIcons = document.querySelector(".navbar-icons");
const preloader = document.querySelector(".preloader-container");
const websiteContent = document.querySelector("#website-content");
const slides = document.querySelectorAll(".slide-item");
const dots = document.querySelectorAll(".dot-item");

//variables
const themes = {
  blue: [
    { key: "--primary-color", value: "#1E0342" },
    { key: "--secondary-color", value: "#D20062" },
    { key: "--dark-background-color", value: "#31363F" },
    { key: "--navbar-scroll-background-color", value: "rgba(30, 3, 66, 0.6)" },
  ],
  red: [
    { key: "--primary-color", value: "#820300" },
    { key: "--secondary-color", value: "#4E6E81" },
    { key: "--dark-background-color", value: "#31363F" },
    { key: "--navbar-scroll-background-color", value: "rgba(130, 3, 0, 0.6)" },
  ],
  orange: [
    { key: "--primary-color", value: "#fc6736" },
    { key: "--secondary-color", value: "#0c2d57" },
    { key: "--dark-background-color", value: "#333" },
    {
      key: "--navbar-scroll-background-color",
      value: "rgba(252, 103, 54, 0.6)",
    },
  ],
};
let isShowNewsLetterModal = false;
let currentSlideIndex = 0;

// Function to open the mobile menu when the hamburger button is clicked
hambergerBtn.addEventListener("click", () => {
  const mobileMenu = document.querySelector(".navbar-menu-mobile");
  mobileMenu.style.transform = "translateX(0)";
  document.querySelector(".navbar-menu-mobile-overlay").style.display = "block";
  document.querySelector("body").classList.add("modal-open");
});
// Function to close the mobile menu
function closeMobileMenu() {
  const mobileMenu = document.querySelector(".navbar-menu-mobile");
  mobileMenu.style.transform = "translateX(-300px)";
  document.querySelector(".navbar-menu-mobile-overlay").style.display = "none";
  document.querySelector("body").classList.remove("modal-open");
}
// Function to Displays a preloader, hides website content, and then reveals the content after a delay.

function showPreloaderAndHideContent(preloader, websiteContent, delay) {
  setTimeout(function () {
    preloader.style.display = "none";
    websiteContent.style.opacity = "1";
    document.body.style.overflow = "initial";
  }, delay);
}
// Function for scroll to the top of the document
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
// ---------------Display defferent view functionality-------------

// Function for Display defferent view and add or remove active class
function handleNavLinkClick(event, callBack = () => {}) {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const targetLink = event.target;
    allLinks.forEach((link) => {
      link.classList.remove("active");
    });
    targetLink.classList.add("active");
    const targetPageId = targetLink.getAttribute("href").substring(1);
    showPage(targetPageId);
    scrollToTop();
    callBack();
  }
}

// Attach handleNavLinkClick to the navbar menu to handle navigation link clicks
navbarMenu.addEventListener("click", (event) => {
  handleNavLinkClick(event);
});

// Attach handleNavLinkClick to the navbar mobile-menu to handle navigation link clicks for mobile device
navbarMenuMobile.addEventListener("click", (event) => {
  handleNavLinkClick(event, closeMobileMenu);
});

// Add a click event listener to the home-page buttons to handle navigation
homePageButtons.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    event.preventDefault();
    allLinks.forEach((link) => {
      link.classList.remove("active");
    });
    const targetPageId = event.target.dataset.pageid;
    allLinks.forEach((link) => {
      if (link.getAttribute("href").substring(1) === targetPageId) {
        link.classList.add("active");
      }
    });
    showPage(targetPageId);
    scrollToTop();
  }
});

// Function for showing a specific page by adding or removing the 'active' class.
function showPage(pageId) {
  pages.forEach((page) => {
    if (page.id === pageId) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  });
}

// --------------- scroll-triggered animation in home-page functionality-------------
function checkPosition() {
  homaPagesections.forEach((section) => {
    const position = section.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;
    if (position < screenHeight * 0.5) {
      // Adjust the threshold as needed
      section.classList.add("active");
    }
  });
}

// ---------------Toggle dark-light theme functionality-------------

// Function to toggle theme and save in local storage
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    document.querySelector(".toggle-mode").innerHTML =
      '<span class="material-symbols-outlined">dark_mode</span>';
    localStorage.setItem("theme", "light");
  } else {
    body.classList.add("dark");
    document.querySelector(".toggle-mode").innerHTML =
      '<span class="material-symbols-outlined">light_mode</span>';
    localStorage.setItem("theme", "dark");
  }
}
// Event listener for theme toggle
document.querySelector(".toggle-mode").addEventListener("click", toggleTheme);

// Check for stored theme preference on page load
function handleSetThemeOnLoad() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    toggleTheme();
  }
}

// ---------------Change color theme functionality-------------

// Apply a theme
function applyTheme(theme) {
  if (themes.hasOwnProperty(theme)) {
    themes[theme].forEach((item) => {
      document.documentElement.style.setProperty(item.key, item.value);
    });
    localStorage.setItem("theme-color", theme);
  }
}
// Set the active state for the theme buttons
function setActiveThemeButton(themeColor) {
  const allThemeButtons = navBarIcons.querySelectorAll(".theme-btn");
  allThemeButtons.forEach((button) => button.classList.remove("active"));
  allThemeButtons.forEach((button) => {
    button.dataset.theme === themeColor && button.classList.add("active");
  });
}

// Event handler for theme button clicks
function handleThemeButtonClick(event) {
  if (event.target.classList.contains("theme-btn")) {
    const theme = event.target.dataset.theme;
    setActiveThemeButton(theme);
    applyTheme(theme);
  }
}
// Event handler for window load
function handleSetColorThemeOnLoad() {
  const themeColor = localStorage.getItem("theme-color");
  if (themeColor) {
    setActiveThemeButton(themeColor);
    applyTheme(themeColor);
  }
}
// Attach event listener for theme button clicks
navBarIcons.addEventListener("click", handleThemeButtonClick);

// ---------------Slider in home-page functionality-------------

// Show a specific slide by adding or removing the 'active-slide' class.
function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("active-slide");
    } else {
      slide.classList.remove("active-slide");
    }
  });
}
// Activate a specific dot by adding the 'active-dot' class
function activateDot(index) {
  dots.forEach((dot) => {
    dot.classList.remove("active-dot");
  });
  dots[index].classList.add("active-dot");
}
// Move to the next slide and update the corresponding dot
function nextSlide() {
  slides[currentSlideIndex].classList.remove("active-slide");
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  slides[currentSlideIndex].classList.add("active-slide");
  activateDot(currentSlideIndex);
}
// Go to a specific slide and update the corresponding dot
function goToSlide(index) {
  currentSlideIndex = index;
  showSlide(currentSlideIndex);
  activateDot(currentSlideIndex);
}
// Add click event listeners to dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
  });
});
// Automatic slide transition
// setInterval(nextSlide, 5000);

// ---------------Scroll to-top button functionality-------------
// Function for display/hide the to-top button.
function updateToTopBtnVisibility() {
  if (
    document.body.scrollTop > 280 ||
    document.documentElement.scrollTop > 280
  ) {
    document.getElementById("toTopBtn").style.display = "block";
  } else {
    document.getElementById("toTopBtn").style.display = "none";
  }
}

// ---------------Changing navBar background-color functionality-------------
function changeNavBarBgFunction() {
  if (
    document.body.scrollTop > 280 ||
    document.documentElement.scrollTop > 280
  ) {
    document.querySelector(".navbar").style.backgroundColor =
      "var(--navbar-scroll-background-color)";
    document.querySelector(".navbar").style.backdropFilter = "blur(5px)";
  } else {
    document.querySelector(".navbar").style.backgroundColor =
      "var(--navbar-background-color)";
    document.querySelector(".navbar").style.backdropFilter = "none";
  }
}

// ---------------ProgressBar in history-page functionality-------------
function updateProgressBar() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

// ---------------Apear newsLetter in home-page functionality-------------
// Function to show newsletter modal when scrolled halfway down the home-page
function showNewsletterModalOnScroll() {
  if (
    document.body.scrollTop > document.body.scrollHeight / 2 ||
    (document.documentElement.scrollTop >
      document.documentElement.scrollHeight / 2 &&
      !isShowNewsLetterModal)
  ) {
    isShowNewsLetterModal = true;
    document.getElementById("newsletterModal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    document.querySelector("body").classList.add("modal-open");
  }
}
// Function to close newsletter modal
function closeNewsLetterModal() {
  document.getElementById("newsletterModal").style.display = "none";
  document.querySelector("body").classList.remove("modal-open");
  document.getElementById("overlay").style.display = "none";
}

// ---------------Show images in large scale in places-page functionality-------------
// Function to show the image-modal
function openImageModal(img) {
  let modal = document.getElementById("places-modal");
  let modalImg = document.getElementById("places-modal-img");
  document.getElementById("overlay").style.display = "block";
  document.querySelector("body").classList.add("modal-open");
  modal.style.display = "block";
  modalImg.src = img.src;
}

// Function to close the image-modal
function closeImageModal() {
  let modal = document.getElementById("places-modal");
  document.getElementById("overlay").style.display = "none";
  document.querySelector("body").classList.remove("modal-open");
  modal.style.display = "none";
}

// ---------------Progress-bar in places-page functionality-------------
function updateProgressBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

// Add event listener for keydown event on the window
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeImageModal();
    closeNewsLetterModal();
  }
});
// Add scroll event listener to the window
window.onscroll = function () {
  showNewsletterModalOnScroll();
  updateToTopBtnVisibility();
  changeNavBarBgFunction();
  updateProgressBar();
  checkPosition();
};

// Call functions when the window is loaded
window.addEventListener("load", () => {
  scrollToTop();
  handleSetColorThemeOnLoad();
  handleSetThemeOnLoad();
  showPreloaderAndHideContent(preloader, websiteContent, 1000);
});
