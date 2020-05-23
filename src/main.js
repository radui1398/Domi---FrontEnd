import Vue from 'vue';
import VueRouter from 'vue-router';
import Notifications from 'vue-notification';
import Vuelidate from 'vuelidate'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import App from './App.vue';


import FirebaseConfig from './firebaseConfig';
import {routes} from './routes';
import {store} from './store/store';

Vue.use(Notifications);
Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(Buefy);
// Vue.use(BootstrapVue);
// Vue.use(IconsPlugin);


const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.currentUser) {
      store.commit('setParams', to.params);
      next();
      return
    }
    next('/auth/login')
  } else {
    next()
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
