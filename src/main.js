import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.prototype.$axios = axios;



// //引入vue2-svg-icon并且注册组件
// import Icon from 'vue2-svg-icon/Icon.vue'
// Vue.component('icon',Icon);


Vue.config.productionTip = false
Vue.use(ElementUI);




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
