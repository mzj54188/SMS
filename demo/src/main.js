import Vue from 'vue'
// 引入axios
import axios from 'axios'

// 引入element-ui的组件和样式
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

//解构 引入组件
import {Message} from 'element-ui'; 

import App from './App.vue'
import router from './router'

// 引入公用样式
import '@/styles/common.less';

// 注册elementui
Vue.use(ElementUI);

//把axios挂在vue的原型上
Vue.prototype.axios = axios;

//全局路由守卫 拦截所有路由
router.beforeEach((to,from,next)=>{
  // 获取token
  const token=window.localStorage.getItem('token');
   if (token) {
    // 直接放行
    next();
  } else {  // 否则是没有
    // 如果去的是登录页
    if (to.path === '/login') {
      // 直接放行
      next();
    } else {
      // 如果去的是其他页,跳转到登录页
      Message.error('请先登录！')
      return next({"path": "/login"})
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
