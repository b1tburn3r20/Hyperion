const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Display the registration form
const showRegisterForm = (req, res) => {
  res.render('register');
};

// Process the registration form submission
const processRegisterForm = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if the username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Check if the passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  // Send success response
  res.status(201).json({ message: 'User registered successfully' });
};

module.exports = { showRegisterForm, processRegisterForm };
