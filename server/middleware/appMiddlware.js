const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const override = require('method-override');
const config = require('../config/config');

// setup global middleware here
function appMiddleware(app) {
  // 3rd middleware - debug tool to log detailed requests sent to server. options: combined, dev, tiny...
  app.use(morgan('tiny'));

  // 3rd middleware - body parser makes it possible to post JSON to the server
  // we can access data we post in req.body
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  const whitelist = config.corsWhiteList;
  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200
  };

  app.use(cors(corsOptions));
  app.use(override());
}
module.exports = appMiddleware;
