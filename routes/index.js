var express = require('express');
var router = express.Router();
 const mongoose=require('mongoose');
 const User= require('../models/users');

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.send('app running fine');
  var user= new User({
    _id: new mongoose.Types.ObjectId(),
    name:'Umer Ahsan',
    emailId:'asasdasd'
  })
  user.save().then(result=>{
    console.log(result);
  }).catch(err=>console.log(err));
});

module.exports = router;
