const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");

const moviesRouter = require("./routers/moviesRouter");
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");

app.use(
  cors({
    origin: process.env.FE_URL,
  })
);
app.use(express.static("public"));
app.use(express.json());

app.use("/movies", moviesRouter);

app.use(notFound);
app.use(errorsHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
