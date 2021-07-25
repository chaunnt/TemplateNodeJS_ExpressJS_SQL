/* eslint-disable no-unused-vars */
require('dotenv').config();
const router = require('express').Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('../config/config');

const booksRouter = require('./books/routes/booksRouter');

const authMiddleware = require('../middleware/authMiddleware');

const specs = swaggerJsdoc(config.swaggerConfig);
if (process.env.ENV === 'dev') {
  router.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
}

router.use('/books', authMiddleware(), booksRouter);

module.exports = router;
