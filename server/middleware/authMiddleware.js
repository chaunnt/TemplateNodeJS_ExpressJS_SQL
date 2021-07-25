module.exports = () => {
  return async (req, res, next) => {
    //decode JWT Token
    //verify user, etc
    return next();
  };
};
