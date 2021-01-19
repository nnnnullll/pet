import Vue from 'vue'
import Router from 'vue-router'
import R from '../views/register'//视图组件导入 改别名Register
import Othershome from '../views/othershome'
import PetRegister from '../components/petregister'
import PetLog from '../components/petlog'
import Home from '../components/home'
import Content from "../components/Content";
import Login from "../views/Login";
import Main from "../views/Main";
import Testcomp from "../components/Testcomp/Testcomp";
import like from "../components/like";
import collect from "../components/collect";
import user from "../components/user";
import section from "../components/section";
import rank from "../components/rank";
import sortcomp from "../components/sortcomp/sortcomp";
import register from "../components/register";
import search from "../components/search";
import pethome from "../components/pethome";
import lan from "../components/lan"
import knowledgecard from "../components/knowledgecard";
Vue.use(Router)

export default  new Router({
  mode: 'history',
  routes:[
    {
      path:'/r',//网站访问路径
      name:'R',//这个路由的名字叫Regiter
      component:R//内容就是上面引入的视图组件Register
    },
    {
      path:'/o',
      name:'Othershome',
      component:Othershome
    },
    {
      path:'/register',
      name:'PetRegister',
      component:PetRegister
    },
    {
      path:'/log',
      name:'PetLog',
      component:PetLog
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    },
    {
      //路由路径
      path: '/content',
      //跳转的组件
      name: 'content',
      component: Content,
    },
    {
      path:'/login',
      name:'login',
      component: Login,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path:'/main',
      name:'Main',

      component: Main,
      children:[
        {
          path:'/like',
          name:'like',
          component: like
        },

        {
          path:'/collect',
          name:'collect',
          component: collect
        },
        {
          path:'/user',
          name:'user',
          component: user
        },
        {
          path:'/section',
          name:'section',
          component: section,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path:'/rank',
          name:'rank',
          component: rank
        },

      ]
    },
    {
      path:'/test',
      name:'test',
      component: Testcomp
    },
    {
      path:'/sort',
      name:'sort',
      component: sortcomp
    },
    {
      //路由路径
      path: '/register',
      //跳转的组件
      name: 'register',
      component: register,
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
      component: pethome
    },
    {
      //路由路径
      path: '/lan',
      //跳转的组件
      name: 'lan',
      component: lan
    },
    {
      //路由路径
      path: '/knowledgecard',
      //跳转的组件
      name: 'knowledgecard',
      component: knowledgecard
    },
  ]
})
