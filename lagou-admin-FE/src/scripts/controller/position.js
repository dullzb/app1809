const positionTpl = require('../views/position.html')


const positionController = {
 async render({res,router}){

    //获取列表数据
    let listData = await this.getList().then(res=>res)
    //使用art-template 支持html
    let tpl = template.render(positionTpl,{
      data: JSON.parse(listData)
    })



    res.render(tpl)
    //点击按钮 -- 》 路由的跳转   router.go('/position/add')

    $('#app-position-add').on('click',()=>{
      router.go('/position_add') //编程式导航
    })


    //进行删除的操作

    this.removeItem(res,router)


  },
  getList(){
    return $.ajax({
      url: '/api/position/find',
      success(res){
        return res
      }
    })
  },
  removeItem(res,router){
    let _this = this
    $("tr[data-id]").on('click','.app-position-remove',function(){
      let id = $(this).parents('tr').attr('data-id')
      let companyLogo = $(this).parents('tr').attr('data-img')
      $.ajax({
        url: '/api/position/remove',
        data: {
          id,companyLogo
        },
        type: 'delete',
        success(result){
          _this.render({res,router})
          router.go('/position')
          console.log('删除成功')
        }
      })

    })
  }
}


module.exports = positionController