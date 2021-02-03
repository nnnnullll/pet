import Vue from 'vue'
import Router from 'vue-router'
import R from '../views/register'//视图组件导入 改别名Register
import Othershome from '../views/othershome'
import PetRegister from '../components/petregister'
import PetLog from '../components/petlog'
import PetLog2 from '../components/petlog2'
import Home from '../components/home'
import Content from "../components/Content";
import Testcomp from "../components/Testcomp/Testcomp";
import Test from "../views/test";
import sortcomp from "../components/sortcomp/sortcomp";
import search from "../components/search";
import pethome from "../components/pethome";
import lan from "../components/lan"
import knowledgecard from "../components/knowledgecard";
import hospital from "../components/hospital";
import Zhongzhuan from "../components/zhongzhuan"
import Otheruser from "../components/otheruser"
Vue.use(Router)

export default  new Router({
  mode: 'history',
  routes:[
    {
      path:'/r',//网站访问路径
      name:'R',//这个路由的名字叫Regiter
      component:R,//内容就是上面引入的视图组件Register
    },
    {
      path:'/o',
      name:'Othershome',
      component:Othershome,

    },
    {
      path:'/petregister',
      name:'PetRegister',
      component:PetRegister,
  
    },
    {
      path:'/log',
      name:'Petlog',
      component:PetLog,
    
    },
    {
      path:'/log2',
      name:'Petlog2',
      component:PetLog2,
    
    },
    {
      path:'/home',
      name:'Home',
      component:Home,
     
    },
    {
      //路由路径
      path: '/content',
      //跳转的组件
      name: 'content',
      component: Content,
      
    },
    {
      path:'/test',
      name:'test',
      component: Testcomp,
     
    },
    {
      path:'/t',
      name:'t',
      component: Test,
     
    },
    {
      path:'/sort',
      name:'sort',
      component: sortcomp,
     
    },
    {
      //路由路径
      path: '/search',
      //跳转的组件
      name: 'search',
      component: search,

    },
    {
      //路由路径
      path: '/pethome',
      //跳转的组件
      name: 'pethome',
      component: pethome,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      //路由路径
      path: '/lan',
      //跳转的组件
      name: 'lan',
      component: lan,
      
    },
    {
      //路由路径
      path: '/knowledgecard',
      //跳转的组件
      name: 'knowledgecard',
      component: knowledgecard,
    },
    {
      //路由路径
      path: '/hospital',
      //跳转的组件
      name: 'hospital',
      component: hospital,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
     
    },
    {
      //路由路径
      path: '/zhongzhuan',
      //跳转的组件
      name: 'Zhongzhuan',
      component: Zhongzhuan,
    },
    {
      //路由路径
      path: '/otheruser',
      //跳转的组件
      name: 'Otheruser',
      component: Otheruser,
    },
  ]
})
