import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import RoomView from '@/views/RoomView'
import RoomForm from '@/components/RoomForm'
import VueCookies from 'vue-cookies'

const COOKIE_NAME = "Cookie se-no"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: () => {
      if(VueCookies.isKey(COOKIE_NAME) === true){
        VueCookies.remove(COOKIE_NAME)
      }
    }
  },
  {
    path: '/RoomForm',
    name: 'RoomForm',
    component: RoomForm
  },
  {
    path: '/Room/:id',
    name: 'RoomView',
    component: RoomView,
    beforeEnter: (to, from, next) => {
      if(VueCookies.isKey(COOKIE_NAME) === false){
        alert("不正なアクセス。入室できません。")
        next(false)   // ナビゲーションを中止
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
