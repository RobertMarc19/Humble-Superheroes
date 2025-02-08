const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const indexRouter = require("./routes/index");
const heroesRouter = require("./routes/superheroes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", heroesRouter);

module.exports = app;