const express = require('express');
const app = express();
//const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const errorHandler = require('./middleware/errorHandler');

// Configuration
//dotenv.config();
app.set('port', (process.env.PORT || 8081));


// Middleware
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  if (!_.isEmpty(req.body)) {
    console.log(req.body);
  }  
  next();
});

// API
app.use('/api/user', require('./user/user.controller'));
app.use('/api/player', require('./player/player.controller'));
app.use('/api/clan', require('./clan/clan.controller'));

app.use(errorHandler);
// 404 handling
// app.use(function(req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   res.json(err);
// });

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
