import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default  new Router({
  mode: 'history',
  routes:[
    {
      path:'/r',//网站访问路径
      name:'R',//这个路由的名字叫Regiter
      component:()=>import("../views/register"),
    },
    {
      path:'/o',
      name:'Othershome',
      component:()=>import("../views/othershome"),
    },
    {
      path:'/petregister',
      name:'PetRegister',
      component:()=>import("../components/petregister"),
  
    },
    {
      path:'/log',
      name:'Petlog',
      component:()=>import("../components/petlog"),
    
    },
    {
      path:'/log2',
      name:'Petlog2',
      component:()=>import("../components/petlog2"),
    
    },
    {
      path:'/home',
      name:'Home',
      component:()=>import("../components/home"),
    },
    {
      //路由路径
      path: '/content',
      //跳转的组件
      name: 'content',
      component:()=>import("../components/Content"),
      
    },
    {
      path:'/t',
      name:'t',
      component:()=>import("../views/test"),
    },
    {
      //路由路径
      path: '/search',
      //跳转的组件
      name: 'Search',
      component:()=>import("../components/search"),
    },
    {
      //路由路径
      path: '/medicalcard',
      //跳转的组件
      name: 'medicalcard',
      component:()=>import("../components/MedicalCard"),
    },
    {
      //路由路径
      path: '/Uploader',
      //跳转的组件
      name: 'Uploader',
      component:()=>import("../components/Uploader"),
    },
    {
      //路由路径
      path: '/pethome',
      //跳转的组件
      name: 'pethome',
      component:()=>import("../components/pethome"),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      //路由路径
      path: '/lan',
      //跳转的组件
      name: 'lan',
      component:()=>import("../components/lan"),
      
    },
    {
      //路由路径
      path: '/knowledgecard',
      //跳转的组件
      name: 'knowledgecard',
      component:()=>import("../components/knowledgecard"),
    },
    {
      //路由路径
      path: '/hospital',
      //跳转的组件
      name: 'hospital',
      component:()=>import("../components/hospital"),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/zhongzhuan',
      name: 'Zhongzhuan',
      component:()=>import("../components/zhongzhuan"),
    },
    {
      path: '/otheruser',
      name: 'otheruser',
      component:()=>import("../components/otheruser"),
    },
    {
      path: '/otheruserpt',
      name: 'otheruserpt',
      component:()=>import("../components/otheruserpt"),
    },
    {
      path: '/otheruservd',
      name: 'otheruservd',
      component:()=>import("../components/otheruservd"),
    },
    {
      path: '/userhistory',
      name: 'userhistory',
      component:()=>import("../components/userhistory"),
    },
    {
      path: '/userstar',
      name: 'userstar',
      component:()=>import("../components/userstar"),
    },
    {
      path: '/userhome',
      name: 'userhome',
      component:()=>import("../components/userhome"),
    },
    {
      path: '/usershezhi',
      name: 'usershezhi',
      component:()=>import("../components/usershezhi"),
    },
    {
      path: '/petinfo',
      name: 'petinfo',
      component:()=>import("../components/petinfo"),
    },
  ]
})
