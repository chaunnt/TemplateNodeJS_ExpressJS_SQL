const { getCurrentUser } = require('../utils/common-helpers');
module.exports = () => {
  return async (req, res, next) => {
    let currentUser = getCurrentUser(req);
    //do something 
    return next();
  };
};
