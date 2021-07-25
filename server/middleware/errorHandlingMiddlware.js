const response = require('./response');

// setup API error handling middleware here
function errorHandlingMiddleware(app) {
  app.use((err, req, res, next) => {
    return response.failure(res, "", err);
  });
}
module.exports = errorHandlingMiddleware;
