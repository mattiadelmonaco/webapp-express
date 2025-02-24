const validationId = (req, res, next) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: `ID is incorrect: ID insert: ${req.params.id}`,
    });
  }
  next();
};

module.exports = validationId;
