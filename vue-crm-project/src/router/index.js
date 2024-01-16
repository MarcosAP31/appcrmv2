import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import CreateContact from '../components/contacts/CreateContact.vue'
import EditContact from '../components/contacts/EditContact.vue'
import ListContact from '../components/contacts/ListContact.vue'
import LoginForm from '../components/LoginForm.vue'
const routes = [
  /*{
    path: '/',
    name: 'home',
    component: HomeView
  },*/
  {
    path: '/',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/contacts/create',
    name: 'CreateContact',
    component:CreateContact
  },
  {
    path: '/contacts/edit/:id',
    name: 'EditContact',
    component: EditContact
  },
  {
    path: '/contacts/list',
    name: 'ListContact',
    component: ListContact
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
