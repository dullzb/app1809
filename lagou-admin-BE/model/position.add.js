/* 
  model 有两个任务
    1. 入库
    2. 暴露接口
*/
const { position } = require('../db/index.js')
const  add = (data) => {
    console.log( data )
    //已经把前端发过来的数据接收到了
    // 1. 存入数据库
    let consequence = null
    if ( JSON.stringify(data) != '{}'){
      position.add(data)
      consequence = {
        rat: true,
        data: {
          msg: 'succ~~~'
        }
      }
    }else{
      consequence = {
        rat: false,
        data: {
          msg: 'succ~~~'
        }
      }
    }
    // 2. 暴露接口
    return JSON.stringify(consequence)
}


const find = () => {
  //进行的数据库的查询
  return position.find()
}


const remove = (id) => {
  return position.remove(id)
}

module.exports = {
  add,find,remove
}