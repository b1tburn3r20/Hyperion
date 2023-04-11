// Define variables for form input elements
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

// Define variable for submit button element
const submitButton = document.querySelector('button[type="submit"]');

// Add event listener for form submission
submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form from submitting

  // Create object with form data
  const formData = {
    username: usernameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    confirmPassword: confirmPasswordInput.value
  };

  // Send data to server using AJAX and fetch API
  fetch('/register', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(data => {
      // Handle server response
      console.log(data);
      alert('Registration successful!');
      // Redirect to login page
      window.location.href = '/login.html';
    })
    
    // comment
});
