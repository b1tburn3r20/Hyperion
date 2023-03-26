// navbar.js
function initNavbar() {
  // Get the menu container and the bars icon
  const menuContainer = document.querySelector('.menu-container');
  const barsIcon = document.querySelector('.bars-icon');

  // Function to toggle the menu
  function toggleMenu() {
    menuContainer.classList.toggle('active');
  }

  // Function to close the menu when clicked outside
  function closeMenu(event) {
    const isClickInsideMenu = menuContainer.contains(event.target);
    const isClickOnBarsIcon = barsIcon.contains(event.target);

    if (!isClickInsideMenu && !isClickOnBarsIcon && menuContainer.classList.contains('active')) {
      menuContainer.classList.remove('active');
    }
  }

  // Attach event listeners
  barsIcon.addEventListener('click', toggleMenu);
  document.addEventListener('click', closeMenu);
}
