const errorsHandler = (err, req, res, next) => {
  return res.status(500).json({
    status: 500,
    error: "Internal Server Error",
    message: err.message,
  });
};

module.exports = errorsHandler;
