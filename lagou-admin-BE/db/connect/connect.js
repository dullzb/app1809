//连接数据库
const mongoose = require('mongoose')
let dbName = 1809
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, function(err) {
    if (err) {
        throw err
        return
    } else {
        console.log('connect MongoDB succ~~~~')
    }
})