const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuration
app.set('port', (process.env.PORT || 8081));
dotenv.config();

// Middleware
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// API
const userEndpoints = require('./api/routes/user');
const playerEndpoints = require('./api/routes/player');

app.use('/api/user', userEndpoints);
app.use('/api/player', playerEndpoints);

// 404 handling
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  res.json(err);
});

// Connect to db
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  
  app.listen(app.get('port'), () => {
    console.log(`API Server Listening on port ${app.get('port')}`);
  });
});

// todo: lage en mongoose model for user/bruker. Lage endpoints rundt user. 
//       sjekke om han har verifisert tag etc
