const express = require('express');
const app = express();
const morgan =require('morgan')
const indexRouter = require('./routes/index');

app.use(morgan('dev'))
app.use('/', indexRouter);

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);

});

module.exports =app;
// app.listen(3000, () => {
//     console.log('Listening on pot 3000');

// })