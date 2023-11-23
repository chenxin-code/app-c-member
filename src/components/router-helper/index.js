import routerHelperView from './src/router-helper';
import routerHelper from './src/routerHelper';

const install = function(Vue) {
  Vue.prototype.$routerHelper = routerHelper; // 全局方法 方式和router.push()相同
  Vue.component('router-helper', routerHelperView); // 类似router-link
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default install;
