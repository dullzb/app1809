//进行数据库的交互了
const {user} = require('../db')
const bcryptUtils = require('../utils/bcryptUtils')
const userModel = {
  async signup({username,password}){
    //做判断   数据库中有没有我的这个用户

    
    password = await bcryptUtils.genSalt(password)

    user.signup({username,password})
    //接口的暴露
    return {
      data: 'sdsfs'
    }
  },
  async signin({username}){
    let result = await user.find(username)
    return {
      data: {
        rat: true,
        data: JSON.stringify({
          msg: '登录成功'
        })
      }
    }
  }
}



module.exports = userModel