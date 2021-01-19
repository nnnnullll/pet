import Vue from 'vue'
import Router from 'vue-router'
import Register from '../views/register'//视图组件导入 改别名Register
import Othershome from '../views/othershome'
import PetRegister from '../components/petregister'
import PetLogin from '../components/petlogin'
import PetLog from '../components/petlog'
import Content from '../components/Content'
import Home from '../components/home'
Vue.use(Router)


export default  new Router({
  routes:[
    {
      path:'/r',//网站访问路径
      name:'Register',//这个路由的名字叫Regiter
      component:Register//内容就是上面引入的视图组件Register
    },
    {
      path:'/o',
      name:'Othershome',
      component:Othershome
    },
    {
      path:'/rr',
      name:'PetRegister',
      component:PetRegister
    },
    {
      path:'/l',
      name:'PetLogin',
      component:PetLogin
    },
    {
      path:'/log',
      name:'PetLog',
      component:PetLog
    },
    {
      path:'/content',
      name:'Content',
      component:Content
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    }
  ]
})
