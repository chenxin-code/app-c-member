import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./utils/rem.js";
import "./assets/css/common.less";
import routeHelper from "./utils/tools";

import Vant from "vant";
import "vant/lib/index.css";

// import vConsole from "vconsole/dist/vconsole.min.js";
// new vConsole();

//当期是否为手机端。true是。false不是
// routeHelper.isPhone = false;
routeHelper.isPhone = true;
Vue.prototype.$routeHelper = routeHelper;
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
