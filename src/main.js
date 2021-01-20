/*
 * @Description: 这是***页面
 * @Date: 2021-01-20 10:31:06
 * @LastEditTime: 2021-01-20 17:53:05
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./utils/rem.js";
import "./assets/css/common.less";
import routeHelper from "./utils/tools";

import Vant from "vant";
import "vant/lib/index.css";
import * as Components from '@/components'

Vue.use(Vant);

// import vConsole from "vconsole/dist/vconsole.min.js";
// new vConsole();

//当期是否为手机端。true是。false不是
routeHelper.isPhone = false;
// routeHelper.isPhone = true;
Vue.prototype.$routeHelper = routeHelper;

Object.values(Components).forEach(components => {
  Vue.component(components.name, components)
})

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
