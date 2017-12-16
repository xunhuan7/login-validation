// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import 'normalize.css';
import 'font-awesome/css/font-awesome.css';

// 自定义工具
import '../static/utils/layer/layer.css';
import layer from '../static/utils/layer/layer';

Vue.config.productionTip = false;

// axios全局配置
axios.defaults.baseURI = 'http://localhost:8888/';
axios.defaults.timeout = 4000;
Vue.prototype.$axios = axios;
// layer全局配置
Vue.prototype.$layer = layer;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
