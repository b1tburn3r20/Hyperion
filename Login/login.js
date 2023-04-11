const loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert('Please provide a valid email and password.');
    return;
  }

  // Send the data to your server using fetch API
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Redirect to the dashboard or home page
      window.location.href = '/dashboard';
    } else {
      // Display an error message to the user
      alert('Invalid email or password.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
