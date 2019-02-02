import Vue from 'vue'
// 引入element-ui的组件和样式
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from './router'

// 引入公用样式
import '@/styles/common.less';

// 注册elementui
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
