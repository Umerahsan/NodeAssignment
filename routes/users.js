const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../config')
const User = require("../models/user");
const sgMail = require('@sendgrid/mail');

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              isVerified: false
            });
            user
              .save()
              .then(result => {
                var key = createToken(user, config.emailKey);
                console.log(result, key);
                sgMail.setApiKey(config.sendGridKey);
                const msg = {
                  to: user.email,
                  from: '1201umer@gmail.com',
                  subject: 'Welcome from umer',
                  text: 'Verify My email',

                  html: '<a href="http://'+config.serverIp+':'+config.serverPort+'/user/verify/' + key + '">Verify My email</a>',
                };
                sgMail
                  .send(msg)
                  .then(() => {
                    res.status(201).json({
                      message: "User created Please verify email"
                    });
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({
                      error: err
                    });
                  });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          if(!user[0].isVerified){
            return res.status(401).json({
              message: "Please Verify email first"
            });
          }
          const token = createToken(user[0], config.JWTKey)
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/verify/:key', (req, res, next) => {
  var data = jwt.verify(req.params.key, config.emailKey);
  console.log(data);
  User.find({ email: data.email })
   .exec()
   .then(user=>{
     if(user.length==1){
       user[0].isVerified=true;
       user[0].save()
        .then(result=>{
          res.status(201).json({
            message: "User Verified"
          });
        })
        .catch(err=>{
          console.log(err);
          res.status(500).json({
            error:err
          });
          
        })
     }
   })
})

function createToken(user, key) {
  return jwt.sign(
    {
      email: user.email,
      userId: user._id
    },
    key,
    {
      expiresIn: "10h"
    }
  );
}

module.exports = router;