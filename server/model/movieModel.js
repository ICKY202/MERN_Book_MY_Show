const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },
  duration: {
    type: "Number",
    required: true,
  },
  poster: {
    type: "String",
    required: true,
  },
  releaseDate: {
    type: "Date",
    required: true,
  },
  genre: {
    type: "String",
    required: true,
  },
  language: {
    type: "String",
    required: true,
  },
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
