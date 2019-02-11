import SMERouter from 'sme-router'
 
const router = new SMERouter('router-view')

//引入模板
const positionTpl = require('../views/position.html')
const positionAddTpl = require('../views/position-add.html')
 
//引入控制器
const homeController = require('../controller/home.js')
const positionController = require('../controller/position.js')
const positionAddController = require('../controller/position.add.js')

// route config
router.route('/index', (req, res, next) => {
  homeController.render({req,res,next})
})
router.route('/position', (req, res, next) => {
  positionController.render({req,res,next,router})
})
 
router.route('/position_add', (req, res, next) => {
  positionAddController.render({req,res,next,router})
})
 
router.route('*', (req, res, next) => {
  res.redirect('/index')
})