import Vue from 'vue';
import Router from 'vue-router';
import Auth from "../views/Auth";
import Home from "../views/Home";
import NotFound from "../views/NotFound";
import ViewProject from "../views/Project/ViewProject";
import CreateProject from "../views/Project/CreateProject";
import EditProject from "../views/Project/EditProject";
import CreateResource from "../views/Resource/CreateResource";
import EditResource from "../views/Resource/EditResource";

import {store} from "../store/store";
import {BIND_PROJECTS, BIND_RESOURCES} from "../store/actions.type";

Vue.use(Router);

const routes = [
  {
    name: 'auth',
    path: '/auth/:action',
    component: Auth,
  },
  {
    name: "home",
    path: "/",
    component: Home,
    meta: {requiresAuth: true}
  },
  {
    name: 'createProject',
    path: '/project/create',
    component: CreateProject,
    meta: {requiresAuth: true}
  },
  {
    name: 'viewProject',
    path: "/project/:id/view",
    component: ViewProject,
    meta: {requiresAuth: true}
  },
  {
    name: 'editProject',
    path: '/project/:id/edit',
    component: EditProject,
    meta: {requiresAuth: true, reloadDB: true}
  },
  {
    name: 'createResource',
    path: '/resource/create',
    component: CreateResource,
    meta: {requiresAuth: true}
  },
  {
    name: 'editResource',
    path: '/resource/:id/edit',
    component: EditResource,
    meta: {requiresAuth: true, reloadDB: true}
  },
  {
    path: '*',
    component: NotFound
  }
];

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.currentUser) {

      if (from.matched.some(record => record.meta.reloadDB)) {
        store.dispatch("setLoaded", 0);

        store.dispatch(BIND_PROJECTS).then(data =>{
          store.dispatch("incLoad");

          store.dispatch(BIND_RESOURCES, data).then(data => {
            store.dispatch("incLoad")
          });
        });
      }

      next();
      return
    }
    next('/auth/login')
  }
});

export default router;
