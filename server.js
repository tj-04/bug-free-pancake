/* eslint-disable new-cap */
'use strict';

const express = require('express');
const mongoose = require('mongoose');
const logger = require('./config/logger');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const dbConfig = require('./config/db');
const routes = require('./routes');

mongoose.connect(`mongodb://${dbConfig.db.user}:${dbConfig.db.password}@${dbConfig.db.connection_string}/${dbConfig.db.name}?${dbConfig.db.security}`, {useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
  if (err) {
    logger.error({message: `Error in establishing a MongoDB Connection ${err}`});
  } else {
    logger.info({message: `Successfully established a MongoDB Connection ${Date()}`});
  }
});

const app = express();
app.disable('x-powered-by');
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('combined', {stream: logger.stream}));

// Initialising the routes
const router = express.Router();
routes.init(router);

// CORS Request
app.all('*', (req, res, next) => {
  if (!req.get('Origin')) return next();
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Compete, Reference-Id, Authorization');
  res.set('Access-Control-Expose-Headers', 'Compete, Reference-Id');
  if ('OPTIONS' == req.method) return res.sendStatus(200);
  next();
});

app.use('/api', router);

app.use(function(req, res, next) {
  const err = new Error('Page not found!');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({message: err.message || 'Something went wrong. Please try again later'});
});

app.listen(process.env.PORT);
logger.info({serverStatus: `Server started & Listening on PORT:- ${process.env.PORT}`});
