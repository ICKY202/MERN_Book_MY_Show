

const showRoutes = require('express').Router();
const ShowModel = require('../model/showModel');

showRoutes.post('/add-show', async(req, res) => {
    try {
        const newShow = new ShowModel(req.body);
        await newShow.save();
        res.send({success: true, message: "A show has been added"});
    }catch(err) {
        res.send({success: false, message: err.message});
    }
});
showRoutes.post('/get-show-byId', async(req, res)=> {
    try {
        const {showId} = req.body;
        const show = await ShowModel.findById({_id: showId}).populate('movie').populate('theatre');
        res.send({success: true, message: 'A show has fetched by id', data: show});
    }catch(err) {
        res.send({success: false, message: err.message});
    }
});
showRoutes.post('/get-shows-by-theater', async(req, res)=> {
    console.log(req.body);
    try {
        const {_id} = req.body;
        const shows = await ShowModel.find({theatre: _id}).populate('movie');
        res.send({success: true, message: "Shows has been fetched according to theater", data: shows});
    }catch(err) {
        res.send({success: false, message: err.message});
    }
});
showRoutes.post('/get-all-theaters-by-movie', async(req, res)=> {
    try {   
        const {movieId, date} = req.body;
        const shows = await ShowModel.find({movie: movieId, date:date}).populate('theatre');
        console.log(shows);
        const uniqueTheatres = [];
        //[{morning show, pvr, bangalore}, {noon show, pvr bangalore}, {noon show, inox, kolkota}]
        shows.forEach((show) => {
            const isTheatre = uniqueTheatres.find((theatre) => show.theatre._id === theatre._id);

            if(!isTheatre) {
                const theatersWithShows = shows.filter((showObj) => showObj.theatre._id === show.theatre._id);

                uniqueTheatres.push({...show.theatre._doc, shows: theatersWithShows});
            }
        });

        res.send({success: true, message: "fetched all theatres by the movie", data: uniqueTheatres});
    }catch(err) {   
        res.send({success: false, messsge: err.message});
    }
});
showRoutes.put('/update-show', async(req, res)=> {
    try {
        const body = req.body;
        const id = req.body.showId;
        const updatedShow = await ShowModel.findById(id);
        Object.keys(body).forEach((key) => {
            if(key !== 'showId') updatedShow[key] = body[key];
        });
        await updatedShow.save();
        res.send({success: true, message: "A show has been updated successfully"});
    }catch(err) {
        res.send({success: false, message: err.message});
    }
});
showRoutes.post('/delete-show', async(req, res)=> {
    try {
        const id = req.body.showId;
        await ShowModel.findByIdAndDelete(id);
        res.send({success: true, message: 'A show has been deleted successfully'});
    }catch(err) {
        res.send({success: false, message: err.message});
    }
});


module.exports = showRoutes;