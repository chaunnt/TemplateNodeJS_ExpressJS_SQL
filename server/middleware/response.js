const success = (res, data, totalData = null) => {
  const code = res.statusCode || 200;
  const message = res.message || 'success';
  if (totalData) {
    return res.send({ code, message, data, totalData });
  } else {
    return res.send({ code, message, data });
  }
};

const failure = (res, data, error) => {
  const code = error.statusCode || 500;
  let message = typeof error === 'string' ? error : 'failure';
  return res.send({ code, message, data });
};

module.exports = {
  success,
  failure,
};
