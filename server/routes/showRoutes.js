

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
showRoutes.post('get-show-byId', async(req, res)=> {
    try {
        const showId = req.body._id;
        const show = await ShowModel.findById({_id: showId}).populate('movie').populate('theater');
        res.send({success: true, message: 'A show has fetched by id', data: show});
    }catch(err) {
        res.send({success: false, message: err.message});
    }
});
showRoutes.post('get-shows-by-theater', async(req, res)=> {
    try {
        const {_id, date} = req.body;
        const shows = await ShowModel.find({theatre: _id}).populate('movie');
        res.send({success: true, message: "Shows has been fetched according to theater"});
    }catch(err) {
        res.send({success: false, message: err.message});
    }
});
showRoutes.post('get-all-theaters-by-movie', async(req, res)=> {
    try {
        const {movie, date} = req.body;
        const theaters = await ShowModel.find({movie, date}).populate('theater');
    }catch(err) {
        res.send({success: false, message: err.message});
    }
});
showRoutes.put('update-show', async(req, res)=> {
    try {
        const body = req.body;
        const id = req.body._id;
        const updatedShow = await ShowModel.findById(id);
        Object.keys(body).forEach((key) => {
            if(key !== '_id') updatedShow[key] = body[key];
        });
        res.send({succes: true, message: "A show has been updated successfully"});
    }catch(err) {
        res.send({success: false, message: err.message});
    }
});
showRoutes.post('delete-show', async(req, res)=> {
    try {
        const id = req.body_id;
        await ShowModel.findByIdAndDelete(id);
        req.send({success: true, message: 'A show has been deleted successfully'});
    }catch(err) {
        res.send({success: false, message: err.message});
    }
});


module.exports = showRoutes;