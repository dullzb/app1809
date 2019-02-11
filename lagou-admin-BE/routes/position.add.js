var express = require('express');
var router = express.Router();

const multer = require('multer')
const path = require('path')

const positionAddController = require('../controller/position.add.js')


//图片上传和保存在本地后端服务器

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'../public/upload'))
  },
  filename: function (req, file, cb) {
    let fileStr = file.originalname  //3.jpg 
    let docIndex = file.originalname.indexOf('.')
    let fileEnd = fileStr.substr(docIndex)
    req.abc = 'yyb'
    let fileName = file.fieldname + '-' + Date.now() + fileEnd
    req.fileName = fileName
    cb(null, fileName )
  }
})
 
var upload = multer({ storage: storage })


router.route('/add')
.post( upload.single('companyLogo') ,(req,res,next) => {
  positionAddController.add({req,res,next})
})
.get(function(req,res,next){
  res.send('get')
})


router.route('/find')
  .get((req,res,next)=>{
    positionAddController.find({req,res,next})
  })


router.route('/remove')
  .delete((req,res,next)=>{
    positionAddController.remove({req,res,next})
  })

module.exports = router;
