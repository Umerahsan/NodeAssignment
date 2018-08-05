const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Movie = require("../models/movie");


router.get('/all', (req, res) => {

    Movie.find()
        .exec()
        .then(movies => {
            if (movies.length < 1) {
                return res.status(200).json({
                    message: "Mo Movies"
                });
            }
            return res.status(200).json({
                movies: movies
            })
        });
});

router.post('/add', (req, res, next) => {
    var movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });
    movie.save().then(result => {
        console.log(result);
        res.status(201).json({   
            createdProduct: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        console.log(err);
    });
});



module.exports = router;