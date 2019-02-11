const fs = require('fs')
const path = require('path')
const { add,find,remove } = require('../model/position.add.js')

const positionAddController = {
  add:({req, res}) => {
    req.body.companyLogo = req.fileName
    let result = add({...req.body})
      res.render('position-add',{
        data: result
      })
  },
  find: async({req,res})=>{
    // find() == p1
    let result = await find().then( res => res )  //还是
    console.log( result )
    res.render('position-find',{
      data: JSON.stringify(result)
    })
  },
  remove: async({req,res})=>{

    //当前要删除图片  upload

    let {id,companyLogo} = req.body
    let result = await remove(id).then(res=>res)
    if(result){
      fs.unlink(path.resolve(__dirname,`../public/upload/${companyLogo}`),(err)=>{
        console.log('本地数据库中的图片已经删除了')
      })
      res.render('position-remove.ejs',{
        data: JSON.stringify({
          rat: true,
          data: {
            msg: 'del succ'
          }
        })
      })
    }else{
      res.render('position-remove.ejs',{
        data: JSON.stringify({
          rat: false,
          data: {
            msg: 'del fail'
          }
        })
      })
    }
  },
}

module.exports = positionAddController