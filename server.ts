'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const routes = require(process.cwd() + '/routes.js');
const dbConfig = require(process.cwd() + '/config/db');
const loggy = require(process.cwd() + '/config/logger');

mongoose.connect(`mongodb://${dbConfig.db.user}:${dbConfig.db.password}@${dbConfig.db.connection_string}/${dbConfig.db.name}?${dbConfig.db.security}`,
    {useNewUrlParser: true, useUnifiedTopology: true}, (err: any, res: any) => {
      if (err) {
        loggy.error({message: `Error in establishing a MongoDB Connection ${err}`});
      } else {
        loggy.info({message: `Successfully established a MongoDB Connection ${Date()}`});
      }
    });

const app = express();
app.disable('x-powered-by');
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('combined', {stream: loggy.stream}));

// Initialising the routes
const router = express.Router();
routes.init(router);

// CORS Request
app.all('*', (req: any, res: any, next: any) => {
  if (!req.get('Origin')) return next();
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Compete, Reference-Id, Authorization');
  res.set('Access-Control-Expose-Headers', 'Compete, Reference-Id');
  if ('OPTIONS' == req.method) return res.sendStatus(200);
  next();
});

app.use('/api', router);

app.use(function(req: any, res: any, next: any) {
  const err: any = new Error('Page not found!');
  err.status = 404;
  next(err);
});

app.use(function(err: any, req: any, res: any, next: any) {
  res.status(err.status || 500);
  res.send({message: err.message || 'Something went wrong. Please try again later'});
});

app.listen(process.env.PORT);
loggy.info({serverStatus: `Server started & Listening on PORT:- ${process.env.PORT}`});
