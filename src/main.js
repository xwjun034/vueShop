import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyLoad from 'vue-lazyload'; // 图片懒加载
import { Toast,Switch,Dialog} from 'vant';
import axios from 'axios'; //引入axios
Vue.prototype.axios = axios; // 挂载到vue原型链上

Vue.use(Toast)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(VueLazyLoad,{
     preLoad: 1.3,
     error:'./assets/images/common/lazyImg.jpg',
     loading:'./assets/images/common/lazyImg.jpg',
     attempt: 1
 })

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
