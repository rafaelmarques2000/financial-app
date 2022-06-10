import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import {store, revokeAuthState} from "@/service/storeservice"

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/app',
    name: 'home',
    component: HomeView,

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

   //  if(to.name === "login" && store.state.auth) {
   //      next({name: "home"})
   //  }
   //
   //  if(to.name !== "login" && !store.state.auth) {
   //    revokeAuthState(store)
   //    next({name:"login"})
   // }

    next()
})

export default router
