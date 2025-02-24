const connection = require("../data/db");

// Index
const index = (req, res) => {
  const sql = "SELECT * FROM movies";
  connection.execute(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        error: "Internal server error",
        message: `Wrong Query (${sql})`,
      });
    }
    res.json(results);
  });
};

// Show
const show = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT * 
    FROM movies
    WHERE movies.id = ?`;

  connection.execute(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        error: "Internal server error",
        message: `Wrong Query (${sql})`,
      });
    }
    const movie = results[0];

    if (!movie) {
      return res.status(404).json({
        status: 404,
        error: "Not Found",
        message: "Movie not found",
      });
    }

    res.json(movie);
  });
};

module.exports = { index, show };
