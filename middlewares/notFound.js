const notFound = (req, res) => {
  return res.status(404).json({
    status: 404,
    error: "Not Found",
    message: "Page not found",
  });
};

module.exports = notFound;
