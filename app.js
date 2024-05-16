// Select elements
const pages = document.querySelectorAll(".page");
const navigationButtons = document.querySelectorAll(".navigation-btn");
const allLinks = document.querySelectorAll(".navbar ul li a");
const body = document.querySelector("body");
const hambergerBtn = document.querySelector(".hamburger-btn");

// Function to open the mobile menu when the hamburger button is clicked
hambergerBtn.addEventListener("click", () => {
  const mobileMenu = document.querySelector(".navbar-menu-mobile");
  mobileMenu.style.transform = "translateX(0)";
  document.querySelector(".navbar-menu-mobile-overlay").style.display = "block";
  document.querySelector("body").classList.add("modal-open");
});
// Function to close the mobile men
function closeMobileMenu() {
  const mobileMenu = document.querySelector(".navbar-menu-mobile");
  mobileMenu.style.transform = "translateX(-300px)";
  document.querySelector(".navbar-menu-mobile-overlay").style.display = "none";
  document.querySelector("body").classList.remove("modal-open");
}

// ---------------Display defferent view functionality-------------

setTimeout(function () {
  document.getElementById("website-content").style.opacity = "1";
  document.querySelector(".loader").style.opacity = "0";
}, 5000);

// Display defferent view and add or remove active class for navbars items
document
  .querySelector("#navbar ul.navbar-menu")
  .addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      event.preventDefault();
      allLinks.forEach((link) => {
        link.classList.remove("active");
      });
      const targetPageId = event.target.getAttribute("href").substring(1); // Removing the "#" from the href
      event.target.classList.add("active");
      showPage(targetPageId);
      scrollToTop();
    }
  });
document
  .querySelector("#navbar ul.navbar-menu-mobile")
  .addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      event.preventDefault();
      allLinks.forEach((link) => {
        link.classList.remove("active");
      });
      const targetPageId = event.target.getAttribute("href").substring(1); // Removing the "#" from the href
      event.target.classList.add("active");
      showPage(targetPageId);
      scrollToTop();
      closeMobileMenu();
    }
  });
// Display defferent view and add or remove active class for navbars items for mobile device
function displayView(event) {
  if (event.target.tagName === "A") {
    event.preventDefault();
    allLinks.forEach((link) => {
      link.classList.remove("active");
    });
    const targetPageId = event.target.getAttribute("href").substring(1); // Removing the "#" from the href
    event.target.classList.add("active");
    showPage(targetPageId);
    scrollToTop();
  }
}

// Function for scroll to the top of the document
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
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
// Loop through each navbar items and add a click event listener for changing view
navigationButtons.forEach((button) =>
  button.addEventListener("click", (event) => {
    const targetPageId = event.target.dataset.pageid;
    const allLinks = document.querySelectorAll(".navbar ul li a");
    allLinks.forEach((link) => {
      if (link.getAttribute("href").substring(1) == targetPageId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
    showPage(targetPageId);
    //scroll the page to top
    scrollToTop();
  })
);

function typeWriter(text, i, fnCallback) {
  if (i < text.length) {
    document.getElementById("loading-text").innerHTML = text.substring(
      0,
      i + 1
    );
    setTimeout(function () {
      typeWriter(text, i + 1, fnCallback);
    }, 100); // Adjust the speed here (in milliseconds)
  } else if (typeof fnCallback == "function") {
    setTimeout(fnCallback, 1000);
  }
}

// Start the typing animation
//   window.onload = function() {
//     let text = "";
//     typeWriter(text, 0, function(){
//       // Show website content after text animation completes
//       document.getElementById('website-content').style.opacity = '1';
//       document.querySelector('.loader').style.opacity = '0';
//     });
//   };

// ---------------Toggle theme functionality-------------

// Function to toggle theme and save in local storage
const toggleTheme = () => {
  const body = document.body;
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    document.querySelector(".toggle-mode").innerHTML =
      '<span class="material-symbols-outlined">light_mode</span>';
    localStorage.setItem("theme", "light");
  } else {
    body.classList.add("dark");
    document.querySelector(".toggle-mode").innerHTML =
      '<span class="material-symbols-outlined">dark_mode</span>';
    localStorage.setItem("theme", "dark");
  }
};
// Event listener for theme toggle
document.querySelector(".toggle-mode").addEventListener("click", toggleTheme);
// Check for stored theme preference on page load
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    toggleTheme();
  }
});

// ---------------Slider in home-page functionality-------------

// slider in home page hero-section
const slides = document.querySelectorAll(".slide-item");
const dots = document.querySelectorAll(".dot-item");
let currentSlideIndex = 0;

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
// setInterval(nextSlide, 4000);

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
      "rgba(252, 103, 54, 0.8)";
    document.querySelector("a.menu-item").style.color = "black";
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
let isShowNewsLetterModal = false;
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

// Add event listener for keydown event on the window
window.addEventListener("keydown", () => {
  closeImageModal();
  closeNewsLetterModal();
});

// ---------------Progress-bar in places-page functionality-------------
function updateProgressBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

// Add scroll event listener to the window
window.onscroll = function () {
  showNewsletterModalOnScroll();
  updateToTopBtnVisibility();
  changeNavBarBgFunction();
  updateProgressBar();
};
