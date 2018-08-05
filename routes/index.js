var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
// const User = require('../models/users');

/* GET home page. */
// router.get('/', (req, res, next) => {
//   res.send('app running fine');
//   var user = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name: 'Umer Ahsan',
//     emailId: 'asasdasd'
//   })
//   user.save().then(result => {
//     console.log(result);
//     res.status(201).json({
//       message: "Handling POST requests to /products",
//       createdProduct: result
//     });
//   }).catch(err => console.log(err));
// });



// router.post('/', (req, res, next) => {
 
//   var user = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     emailId: req.body.emailId
//   })
//   user.save().then(result => {
//     console.log(result);
//     res.status(201).json({
//       message: "Handling POST requests to /products",
//       createdProduct: result
//     });
//   }).catch(err => {
//     res.status(500).json({
//       error: err
//     });
//     console.log(err);
//   });



// });

module.exports = router;
