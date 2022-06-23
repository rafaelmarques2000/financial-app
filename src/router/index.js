import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AppTemplate from '../views/AppTemplate.vue'
import Dashboard from '../views/dashboard/dashboard.vue'
import Contas from '../views/contas/contas.vue'
import Servicos from '../views/servicos/servicos.vue'
import Transacoes from '../views/transacoes/transacoes.vue'
import {store, revokeAuthState} from "@/service/store-service"

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/app',
    name: 'home',
    component: AppTemplate,
    redirect: {path:"/app/dashboard"},
    children: [
        {
            path: "dashboard",
            component: Dashboard
        },
        {
           path: "contas",
           component: Contas
        },
        {
          path: "servicos",
          component: Servicos
        },
        {
          path: "transacoes",
          component: Transacoes
        }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
    if(to.name === "login" && store.state.auth) {
        next({name: "home"})
    }

    if(to.name !== "login" && !store.state.auth) {
      revokeAuthState(store)
      next({name:"login"})
   }
    next()
})

export default router
