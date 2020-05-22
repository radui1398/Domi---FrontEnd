import MainSecure from "./components/Secure";
import Auth from "./components/Auth/Auth";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NotFound from "./components/Default/404";
import Home from "./components/Pages/Home";
import CreateDiagram from "./components/Pages/CreateDiagram";
import ViewProject from "./components/Pages/Project/ViewProject";
import CreateProject from "./components/Pages/Project/CreateProject";
import CreateResource from "./components/Pages/Resource/CreateResource";
import ViewResource from "./components/Pages/Resource/ViewResource";

export const routes = [
  {
    path: '/',
    component: MainSecure,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        name: 'home',
        path: '/',
        component: Home
      },
      {
        name: 'createProject',
        path: '/project/create',
        component: CreateProject
      },
      {
        name: 'viewProject',
        path: '/project/:id',
        component: ViewProject
      },
      {
        name: 'createResource',
        path: '/project/:id/resource/create',
        component: CreateResource
      },
      {
        name: 'viewResource',
        path: '/project/:id/resource/:rid',
        component: ViewResource
      },
      {
        path: '/diagram/create',
        component: CreateDiagram
      }
    ]
  },
  {
    path: '/auth',
    component: Auth,
    redirect: '/auth/login',
    children: [
      {
        path: '/auth/login', component: Login
      },
      {
        path: '/auth/register', component: Register
      }
    ]
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
];
