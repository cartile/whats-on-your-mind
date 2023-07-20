import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserLogin from '../views/authentication/UserLogin.vue'
import UserRegister from '../views/authentication/UserRegister.vue'
import ThoughtCreate from '../views/thoughts/ThoughtCreate.vue'
import ThoughtsAll from '../views/thoughts/ThoughtsAll.vue'
import ThoughtEdit from '../views/thoughts/ThoughtEdit.vue'
import * as auth from '../services/AuthService'
import * as thoughtService from '../services/ThoughtService'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/thoughts',
    name: 'thoughts-all',
    component: ThoughtsAll,
    beforeEnter: (to, from, next) => {
      thoughtService.getAllThoughts()
      .then((res) => {
        //console.log(res.data.thoughts)
        //console.log(Object.keys(res.data.thoughts[0]))
        //console.log(res.data.thoughts[0].author);
        to.meta.thoughts = res.data.thoughts;
        next()
      })
    }
  },
  {
    path: '/thoughts/new',
    name: 'thoughts-create',
    component: ThoughtCreate,
    beforeEnter: guardRoute
  },
  {
    path: '/thoughts/:id',
    name: 'thoughts-edit',
    component: ThoughtEdit,
    beforeEnter: guardRoute
  },
  {
    path: '/register',
    name: 'register',
    component: UserRegister,
    beforeEnter: guardRouteOpposite
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin,
    beforeEnter: guardRouteOpposite
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
})

function guardRoute(to, from, next) {
  if (auth.isLoggedIn()) {
    next();
  } else {
    next('/login');
  }
}

function guardRouteOpposite(to, from, next) {
  if (!auth.isLoggedIn()) {
    next();
  } else {
    next('/');
  }
}

export default router