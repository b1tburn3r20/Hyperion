const toggleBtn = document.querySelector('.toggle-theme');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
