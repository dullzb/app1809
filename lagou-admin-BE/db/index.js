const process = require('process')
    //1. 连接数据库
require('./connect/connect.js');
//2. 定义骨架
const { userSchema, carSchema,positionAddSchema } = require('./schema/index.js');
//3. 定义模型
const { usersModel, carModel,positionAddModel } = require('./model/index.js')

//4. 实例化得到实体


const Mongo = {
    //增删改查
    position: {
        add(data) {
            let positionAdd = new positionAddModel(data)
            positionAddModel.find((err,res)=>{
                if( !err ){
                    if( res ){
                        let f = true 
                        res.forEach( ( val, index)=>{
                            if( val.companyName === data.companyName && val.positionName === data.positionName){
                                f= false
                                return 
                            }
                        })
                        if( f ){
                            positionAdd.save()
                        }
                    }
                }
            })
        },
        find(){
            //数据库的查询
            let p1 = positionAddModel.find({}).then(res=>res)
            return p1
        },
        remove(id){
            const p1 = positionAddModel.findById(id,function(err,res){
                if( !err ){
                    console.log('删除成功')
                    if( res ){
                        res.remove()
                    }
                    return 
                }
            }).then(res=>{
                if( res ){
                    return true
                }else{
                    return false
                }
            }).catch(err => false)
            return p1
        }
    },
    user: {
        signup(data){
            //存储注册的数据
            let {username} = data
            let user = new usersModel(data)
            usersModel.find({username},function(err,res){
                if( !err ){
                    if( res ){
                        let f = true
                        res.forEach((val,i)=>{
                            if( val.username === username ){
                                //证明数据库有这个用户了
                                f = false
                                return 
                            }
                        })

                        if( f ){
                            user.save()
                        }
                    }
                }
            })
        },
        find(username){
            return usersModel.find({username}).then(res=>res).catch(err=>false)
        }
    }
}


module.exports = {
    user: Mongo.user,
    car: Mongo.car,
    position: Mongo.position
}