import Vue from 'vue';
import VueRouter from 'vue-router';
import Notifications from 'vue-notification';
import Vuelidate from 'vuelidate'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue';


import FirebaseConfig from './firebaseConfig';
import {store} from './store/store';

Vue.use(Notifications);
Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import router from './router/index';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
