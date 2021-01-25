import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
<<<<<<< HEAD
Vue.use(ElementUI);
Vue.use(router);

=======
Vue.use(router);
Vue.use(ElementUI);
>>>>>>> 20674149967405267b40c956d90c8a75e160ef3a
new Vue({
  el: '#app',
  //配置路由
  router,
  store,
  components: { App },
  template: '<App/>',
  render:h=>h(App)
}).$mount('#app');

// http request 请求拦截器
axios.interceptors.request.use(config => {
  if(localStorage.getItem('token')){
    if(pathname != '/' &&  pathname != '/content'){
      config.headers.common['token'] = localStorage.getItem('token');
      console.log("token----->"+localStorage.getItem('token'))
    }
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
