const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Serve static files from the HomePageForVideos folder
app.use(express.static(__dirname));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Import userRoutes
const userRoutes = require('./routes/userRoutes');

// Set up sessions
app.use(
  session({
    secret: 'your-secret-key', // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

// Use the user routes
app.use('/api/users', userRoutes);
