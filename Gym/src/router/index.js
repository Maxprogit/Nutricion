import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Dietas from '../components/Dietas.vue'
import Registro from '../views/Registro.vue'
import Rutinas from '../components/Rutinas.vue'
import Login from '../components/auth/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/hello', name: 'hello', component: HelloWorld,
    },
    {
      path: '/dietas', name: 'dietas', component: Dietas,
    },
    {
      path: '/registro', name: 'registro', component: Registro,
    },
    {
      path: '/rutinas', name: 'rutinas', component: Rutinas,
    },
    {
      path: '/login', name: 'login', component: Login
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
