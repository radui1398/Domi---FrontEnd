import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

import {vuexfireMutations} from 'vuexfire';
import users from "./modules/users";
import extra from "./modules/extra";
import resources from "./modules/resources";
import projects from "./modules/projects";

Vue.use(Vuex);

export const store = new Vuex.Store({
  mutations: {...vuexfireMutations},
  modules: {
    users,
    projects,
    resources,
    extra
  },
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: false }),
      removeItem: key => Cookies.remove(key)
    })
  ]
});
