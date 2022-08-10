const sendOk = (res, message = "OK", code = 200) => {
  res.status(code).json({
    message,
  });
};

const sendData = (res, data = [], message = "OK", code = 200) => {
  res.status(code).json({
    message,
    data,
  });
};

const sendError = (res, message = "Error!", code = 500) => {
  res.status(code).json({
    message,
  });
};

module.exports = { sendOk, sendData, sendError };
