/* eslint-disable */
require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const path = require('path');
const config = require('./server/config/config');
const appMiddleware = require('./server/middleware/appMiddlware');
const viewMiddleware = require('./server/middleware/viewMiddleware');
const preStart = require('./server/middleware/preStart');
const errorHandlingMiddlware = require('./server/middleware/errorHandlingMiddlware');
const api = require('./server/api/api');
const app = express();

global.appRoot = __dirname;

appMiddleware(app);
viewMiddleware(app);

app.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

if(process.env.ENV === 'dev'){
  app.get('/', (req, res) => {
      res.redirect('/api/docs/#/');
  });
}
app.use('/api', [preStart()], api);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));
app.use('/public', express.static(path.join(appRoot, 'public/upload')));
errorHandlingMiddlware(app);

app.server = app.listen(config.port, () => {
  console.log(`Running on http://localhost:${chalk.green(config.port)}`);
});

// export the app for testing
module.exports = app;
