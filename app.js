const express = require('express');
const app = express();
const morgan = require('morgan')
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://umerahsan:hummerh4@cluster0-vw1mm.mongodb.net/NodeAssignment?retryWrites=true",
{useNewUrlParser: true} 
)
app.use(morgan('dev'))
app.use('/', indexRouter);

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);

});
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