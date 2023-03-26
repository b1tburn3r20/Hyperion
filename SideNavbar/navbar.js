function toggleMenu() {
  document.querySelector(".menu-container").classList.toggle("active");
}

// Get the menu container and the bars icon
const menuContainer = document.querySelector('.menu-container');
const barsIcon = document.querySelector('.bars-icon');

// Listen for clicks on the document
document.addEventListener('click', function (event) {
  const isClickInsideMenu = menuContainer.contains(event.target);
  const isClickOnBarsIcon = barsIcon.contains(event.target);

  if (!isClickInsideMenu && !isClickOnBarsIcon && menuContainer.classList.contains('active')) {
    // Clicked outside the menu container and the bars icon, close it
    menuContainer.classList.remove('active');
  }
}, true);
