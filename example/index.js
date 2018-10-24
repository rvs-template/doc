import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Page from './page.vue';
import Doc from '../src/index';

Vue.config.productionTip = false;
Vue.use(VueRouter).use(Doc);

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: Page }
  ]
});

new Vue({ // eslint-disable-line
  render: h => h(App),
  router,
  el: '#app'
});
