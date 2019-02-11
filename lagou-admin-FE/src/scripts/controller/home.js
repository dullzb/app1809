const homeTpl = require('../views/home.html')


const homeController = {
  render({res}){
    res.render(homeTpl)
  }
}


module.exports = homeController