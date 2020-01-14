import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Page from '@/components/Page'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import Favourites from '@/components/auth/Favourites'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/page/:id',
      name: 'Page',
      component: Page
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/favourites',
      name: 'Favourites',
      component: Favourites
    }
  ]
})
