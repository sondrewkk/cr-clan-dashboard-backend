const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import routes
const authRoutes = require('./routes/auth');

dotenv.config();

// Connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('Connected to db')
);

// Middleware
app.use(express.json());

// Route middleware
app.use('/api/user', authRoutes);


app.listen(3000, () => console.log('Server up and running on port 3000'));
