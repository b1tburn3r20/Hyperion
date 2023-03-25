document.addEventListener('DOMContentLoaded', function () {
    const authIcon = document.querySelector('.nav_auth_link i');
    const authText = document.querySelector('.auth-text');
  
    console.log('authIcon:', authIcon);
    console.log('authText:', authText);
  
    if (authIcon && authText) {
      authIcon.addEventListener('mouseenter', function () {
        authText.style.width = '100%';
        authText.style.opacity = '1';
      });
  
      authIcon.addEventListener('mouseleave', function () {
        authText.style.width = '0';
        authText.style.opacity = '0';
      });
    }
  });
  