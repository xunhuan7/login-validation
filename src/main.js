// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

// axios全局配置
import axios from 'axios';
axios.defaults.baseURI = 'http://localhost:8888/'
axios.defaults.timeout = 4000;
Vue.prototype.axios = axios;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
