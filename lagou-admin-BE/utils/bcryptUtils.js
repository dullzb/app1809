//算法的加密和解密
const bcrypt = require('bcrypt')
const myPlaintextPassword = 'abc123'

const bcryptUtils = {
  genSalt(password){
    return new Promise((resolve,reject)=>{
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function(err, hash) {
          resolve(hash)
        });
      })
    }).then(res=>res)
  },
  compare(){
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        bcrypt.compare('abc123', hash, function(err, res) {
          console.log(res);
        });
      });
    })
  }
}
    

module.exports = bcryptUtils