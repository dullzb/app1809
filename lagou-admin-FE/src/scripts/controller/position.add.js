const positionAddTpl = require('../views/position-add.html')


const positionAddController = {
  render({res,router}){
    res.render(positionAddTpl)

    //点击返回按钮，直接返回上一级

    $('#app-add-back').on('click',()=>{
      router.back()
    })

    $('#app-add-save').on('click',()=>{
      this.doSubmit(router)
    })
  },
  doSubmit(router){

    //使用jquery.form.min.js中提供的方式来进行表单的提交

    $("#app-add-save").on("click", () => {
        console.log( 'submit ')
        var options = {
            "success" : this.resultForm.bind(this,router),
            "resetForm" : true,
            "dataType" : "json"
        };
        $("#app-form-submit").ajaxSubmit(options);
    });

    //点击保存进行ajax提交
   /*  const companyName = $('#companyName').val(),
          positionName = $('#positionName').val(),
          city = $('#city').val(),
          salary = $('#salary').val(),
          degree = $('#degree').val(),
          experience = $('#experience').val(),
          description = $('#description').val(),
          createTime = Date.now() //获取的是时间戳
    $.ajax({
      url: '/api/position/add', //使用了跨域了（第三方库  http-proxy-middleware）
      type: 'POST',
      data: {
        companyName,
        positionName,
        city,
        salary,
        degree,
        experience,
        description,
        createTime
      },
      success(res){
        console.log( JSON.parse(res) )//后台返回结果
        alert('提交成功')
        router.go('/position')
      }
    }) */
  },
  resultForm(router){
    //表单完成了
    router.go('/position')
  }
}


module.exports = positionAddController