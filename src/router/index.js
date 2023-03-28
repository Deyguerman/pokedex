import { createRouter, createWebHistory } from 'vue-router'
import Pokedex from '../views/Pokedex.vue'
import Favorites from '../views/Favorites.vue'
import Login from '../views/authentication/Login.vue'
import SignUp from '../views/authentication/SignUp.vue'
import Detail from '../components/Detail.vue'

import { useUser } from '../composables/useUser'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: Pokedex,
      // meta: { transition: 'fade' },
    },
    {
      path: '/pokedex/:id',
      name: 'pokemonDetail',
      component: Detail
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
      // meta: { transition: 'fade' },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      // meta: { transition: 'fade' },
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp,
      // meta: { transition: 'fade' },
    },
  ]
})

router.beforeEach((to, from, next) => {
  const { userLogged } = useUser()

  if (!userLogged.value && !['login', 'signUp'].includes(to.name)) next('/login')

  if (userLogged.value && to.name === 'login') next('/pokedex')

  next()
})

export default router
