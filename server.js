const express = require('express');
const app = express();
const api = require('./api');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Configuration
app.set('port', (process.env.PORT || 8081));
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

// 404 handling
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  res.json(err);
});

// API
app.use('/api', api);
app.use(express.static('static'));

// Connect to db
mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  app.listen(app.get('port'), () => {
    console.log(`API Server Listening on port ${app.get('port')}`);
  });
});
