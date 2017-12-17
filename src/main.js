// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import 'normalize.css';
import 'font-awesome/css/font-awesome.css';
import qs from 'qs';

Vue.config.productionTip = false;

// 自定义工具
import '../static/utils/layer/layer.css';
import layer from '../static/utils/layer/layer';
import validate from '../static/utils/validate';

// Vue原型添加
Vue.prototype.$axios = axios;
Vue.prototype.$layer = layer;
Vue.prototype.$validate = validate;

// axios全局配置
axios.defaults.baseURL = 'http://localhost:8888/';
axios.defaults.timeout = 4000;
axios.interceptors.request.use((request) => {
  if (request.method === 'post') {
    request.data = qs.stringify(request.data);
  }
  return request;
}, (error) => {
  console.log(error)
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
