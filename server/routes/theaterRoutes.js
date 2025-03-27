

const theaterRoutes = require('express').Router();
const Theater = require('../model/theaterModel');

theaterRoutes.post('/add', async (req, res) => {
    try {
        const theater = new Theater(req.body);
        await theater.save();
        res.send({success: true, message: 'theater added successfully!'});
    }catch(err) {
        res.send({success: false, message: err.message});
    }
});
theaterRoutes.get('/getAllTheater', async (req, res) => {
    try {
        const theaters = await Theater.find().populate('owner');
        res.send({success: true, message: 'fetched all the theaters', data: theaters});
    }catch(err) {
        res.send({success: false, message: err.message});
    }
});
theaterRoutes.post('/get-all-theaters-by-owner', async (req, res) => {
    try {
        const ownerId = req.body.ownerId;
        const filteredTheatreByOwner = await Theater.find({owner:ownerId});
        res.send({
            success:true,
            message:"Theater of owner has been fetched",
            data:filteredTheatreByOwner
        })

    }catch(err) {
        res.send({success: false, message: err.message});
    }
});
theaterRoutes.put('/update-theater', async (req, res) => {
    try {
        const body = req.body;
        const theaterId = req.body._id;
        
        const theater = await Theater.findById(theaterId);

        Object.keys(body).forEach((key) => {
            if(key !== '_id') theater[key] = body[key]; 
        });

        await theater.save();

        res.send({success: true, message: "theater updated successfully"});
        
    }catch(err) {
        res.send({success: true, message: err.message});
    }
});
theaterRoutes.put('/delete-theater', async (req, res) => {
    try {
        const id = req.body._id;
        await Theater.findByIdAndDelete(id);
        res.send({success: true, message: 'Theater deleted successfully'});
    }catch(err) {
        res.send({success: true, message: err.message});
    }
});


module.exports = theaterRoutes;