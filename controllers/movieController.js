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
    SELECT movies.*, ROUND(AVG(reviews.vote),1) AS average_vote
    FROM movies
    LEFT JOIN reviews ON reviews.movie_id = movies.id 
    WHERE movies.id = ?
    GROUP BY movies.id
    `;

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
    movie.image = `${process.env.BE_URL}/movies_cover/${movie.image}`;

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

// Create Review
const createReview = (req, res) => {
  const { id } = req.params;

  const { name, vote, text } = req.body;

  const sql = `INSERT INTO reviews (movie_id, name, text, vote) VALUES (?, ?, ?, ?)`;

  connection.execute(sql, [id, name, text, vote], (err, results) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        error: "Internal server error",
        message: `Wrong Query (${sql})`,
      });
    }

    res.status(201).json({
      status: 201,
      message: "Review added",
    });
  });
};

// Create Movie
const createMovie = (req, res) => {
  const image = req.file.filename;
  // console.log(req.body);

  const { title, director, genre, release_year, abstract } = req.body;

  const sql = `INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)`;

  console.log([title, director, genre, release_year, abstract, image]);

  connection.execute(
    sql,
    [title, director, genre, release_year, abstract, image],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: "Internal server error",
          message: `Wrong Query (${sql})`,
        });
      }

      res.status(201).json({
        status: 201,
        message: "Movie added",
      });
    }
  );
};

module.exports = { index, show, createReview, createMovie };
