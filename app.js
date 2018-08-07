const express = require('express');
const app = express();
const morgan = require('morgan')
const indexRouter = require('./routes/index');
const userRoutes=require('./routes/users');
const movieRoutes=require('./routes/movie')
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const config= require('./config');

mongoose.connect("mongodb+srv://"+config.dbUser+"@cluster0-vw1mm.mongodb.net/NodeAssignment?retryWrites=true",
{useNewUrlParser: true} 
)
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use('/signup', indexRouter);
app.use("/user", userRoutes);
app.use("/movies", movieRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404
    next(error);

})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;
// app.listen(3000, () => {
//     console.log('Listening on pot 3000');

// })