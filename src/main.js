import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer) 
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
import BaiduMap from 'vue-baidu-map'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
import  VueResource  from 'vue-resource'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView)
Vue.use(BaiduMap, {
  ak: 'pssivZt53sNW6Du7mArd2UrtAzeFEkOC'  //百度地图ak
})
Vue.use(VueResource)
Vue.use(router);
Vue.use(ElementUI);
window.router=router
new Vue({
  el: '#app',
  //配置路由
  router,
  store,
  components: { App },
  template: '<App/>',
  render:h=>h(App)
}).$mount('#app');

//http request 请求拦截器

axios.interceptors.request.use(config => {
  if(store.state.token){
      config.headers.Authorization = `token ${store.state.token}`;
      console.log("token----->"+localStorage.getItem('token'))
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// http response 响应拦截器
axios.interceptors.response.use(response => {
  return response;
},error => {
  if (error.response) {
    switch (error.response.status) {
        // 返回401，清除token信息并跳转到登录页面
      case 401:
        localStorage.removeItem('token');
        router.replace({
          path: '/content'
          //登录成功后跳入浏览的当前页面
          // query: {redirect: router.currentRoute.fullPath}
        })
    }
    // 返回接口返回的错误信息
    return Promise.reject(error.response.data);
  }
});



// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    let token = localStorage.getItem('token');
    if (token === null || token === '') {
      next('/content');
    }
    else {
      console.log(token)
      alert("success!!!!");
      next();
    }
  }
  else {
    next();
  }
});
Vue.config.productionTip = false
