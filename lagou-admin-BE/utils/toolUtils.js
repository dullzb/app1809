var jwt = require('jsonwebtoken');
const path = require('path')
const fs = require('fs')

const fsRes = fs.readFileSync(path.resolve(__dirname,'../rsa/private_key'))
console.log(typeof  fsRes.toString() )
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, fsRes.toString());

console.log( token )
module.exports = {
  // token: token
  token
}