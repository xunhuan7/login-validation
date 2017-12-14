import Vue from 'vue';
import Router from 'vue-router';
import 'normalize.css'

Vue.use(Router);

import Login from '@/components/Login.vue';

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
