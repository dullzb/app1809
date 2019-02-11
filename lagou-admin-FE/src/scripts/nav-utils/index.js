const NavUtils = {
  //定义里面的方法
  render(){
    window.addEventListener('load',this.run.bind(this),false)
    window.addEventListener('hashchange',this.run.bind(this),false)
  },
  run(){
    this.setTitle()
    this.setNav()
  },
  setTitle(){
    //用来处理我们路由切换的头部
    const hash = location.hash.slice(1)   //#/index

    let match = {
      '/index': ['主页','欢迎信息'],
      '/position': ['职位管理','职位列表'],
      '/position_add': ['发布职位','职位信息']
    }

    //DOM操作
    const $h1 = $('section.content-header h1')
    $h1.find('span').html( match[hash][0] )
    $h1.find('small').html( match[hash][1] )
    const $breadcrumb = $('#app-home-title')
    const $breadcrumbIcon = $('#app-home-title-icon')
    $breadcrumb.html( match[hash][0] )
    $breadcrumbIcon.html( match[hash][1] )
  },
  setNav(){
    //解决导航的激活状态
    const hash = location.hash.slice(1) 
    const $a = $(`ul.sidebar-menu a[href='#${hash}']`)
    $a.parent().addClass('active').siblings().removeClass('active')
  }
}


module.exports = NavUtils