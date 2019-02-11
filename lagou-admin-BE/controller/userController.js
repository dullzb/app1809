const userModel = require('../model/userModel')


const userController = {
  signup({req,res,next}){//注册
    let {username,password} = req.body

    // password ----》 必须要进行加密

    // res.setHeader('Content-Type','application/json;charset=utf-8') //暴露出去的接口数据类型为json
    res.render('signup',userModel.signup({...req.body}))
  },
  signin({req,res,next}){//登录
    res.setHeader('Content-Type','application/json;charset=utf-8') //暴露出去的接口数据类型为json
    res.render('signin',userModel.signin({...req.body}))
  }
}


module.exports = userController