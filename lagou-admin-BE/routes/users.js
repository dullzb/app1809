var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')


router.route('/signup')
  .post((req,res,next)=>{
    userController.signup({req,res,next})
  })

router.route('/signin')
  .post((req,res,next)=>{
    userController.signin({req,res,next})
  })


module.exports = router;
