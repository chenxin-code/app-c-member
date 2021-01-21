/*
 * @Description: 这是***页面
 * @Date: 2021-01-20 10:31:06
 * @LastEditTime: 2021-01-21 16:44:47
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./utils/rem.js";
import "./assets/css/common.less";
import infiniteScroll from 'vue-infinite-scroll'
import routeHelper from "./utils/tools";

import Vant from "vant";
import "vant/lib/index.css";
import * as Components from '@/components'

Vue.use(Vant);
Vue.use(infiniteScroll)

// import vConsole from "vconsole/dist/vconsole.min.js";
// new vConsole();

Vue.prototype.$routeHelper = routeHelper;

Object.values(Components).forEach(components => {
  Vue.component(components.name, components)
})

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
