

const movieRoutes = require('express').Router();
const Movie = require('../model/movieModel');

movieRoutes.post('/add-movie', async(req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();

        res.send({success: true, message: "Movies added successfully"});

    }catch(err) {
        res.send({success: false, message: err.message});
    }
});

movieRoutes.get('/getAllMovies', async(req, res) => {
    try {
        const movies = await Movie.find();
        res.send({success: true, message: "Fetched all the movies", data: movies});

    }catch(err) {
        res.send({success: false, message: err});
    }
});

movieRoutes.put('/update-movie', async(req, res) => {
    try {
        const body = req.body;
        const movieId = req.body._id;
        const movie = await Movie.findById(movieId);

        Object.keys(body).forEach((key) => {
            if(key !== '_id') movie[key] = body[key];
        });
        const updatedMovie = await Movie(movie);
        await updatedMovie.save();
        res.send({success: true, message: "Movie has been updated successfully", data: updatedMovie });
    }catch(err) {
        res.send({success: false, message: err});
    }
});

movieRoutes.delete('/delete-movie', async(req, res) => {
    
    const movieId = req.body._id;
    try {
        await Movie.findByIdAndDelete(movieId);
        res.send({success: true, message: "Movie has been deleted successfully!"});
    }catch(err) {
        res.send({success: false, message: err});
    }
});


module.exports = movieRoutes;