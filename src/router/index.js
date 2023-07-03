import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserLogin from '../views/authentication/UserLogin.vue'
import UserRegister from '../views/authentication/UserRegister.vue'
import ThoughtCreate from '../views/thoughts/ThoughtCreate.vue'
import ThoughtsAll from '../views/thoughts/ThoughtsAll.vue'
import ThoughtEdit from '../views/thoughts/ThoughtEdit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/thoughts',
    name: 'thoughts-all',
    component: ThoughtsAll
  },
  {
    path: '/thoughts/new',
    name: 'thoughts-create',
    component: ThoughtCreate
  },
  {
    path: '/thoughts/:id',
    name: 'thoughts-edit',
    component: ThoughtEdit
  },
  {
    path: '/register',
    name: 'register',
    component: UserRegister
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router