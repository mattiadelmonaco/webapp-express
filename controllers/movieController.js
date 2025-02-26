const connection = require("../data/db");

// Index
const index = (req, res) => {
  const sql = `
    SELECT movies.*, ROUND(AVG(reviews.vote),1) AS average_vote
    FROM movies
    LEFT JOIN reviews ON reviews.movie_id = movies.id 
    GROUP BY movies.id`;

  connection.execute(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        error: "Internal server error",
        message: `Wrong Query (${sql})`,
      });
    }

    const moviesList = results.map((movie) => {
      movie.image = `${process.env.BE_URL}/movies_cover/${movie.image}`;
      return movie;
    });

    res.json(moviesList);
  });
};

// Show
const show = (req, res) => {
  const { id } = req.params;

  const movieSql = `
    SELECT * 
    FROM movies
    WHERE movies.id = ?`;

  const reviewsSql = `
    SELECT * 
    FROM movies
    JOIN reviews ON reviews.movie_id = movies.id
    WHERE movies.id = ?`;

  connection.execute(movieSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        error: "Internal server error",
        message: `Wrong Query (${movieSql})`,
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

    connection.execute(reviewsSql, [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: "Internal server error",
          message: `Wrong Query (${reviewsSql})`,
        });
      }

      movie.reviews = results;
      res.json(movie);
    });
  });
};

module.exports = { index, show };
