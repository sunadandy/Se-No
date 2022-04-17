import store from '@/store/index.js'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import RoomView from '@/views/RoomView'
import AnswerPresentation from '@/components/AnswerPresentation'
// import VueCookies from 'vue-cookies'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: () => {
      const enterNo = store.getters.GetRoomEnterNo
      if(enterNo !== -1){
        store.commit('ClearRoomEnterNo')
      }
    }
  },
  {
    path: '/Room/:id',
    name: 'RoomView',
    component: RoomView,
    beforeEnter: (to, from, next) => {
      const enterNo = store.getters.GetRoomEnterNo
      if(enterNo === -1){
        alert("不正なアクセス。入室できません。")
        next(false)   // ナビゲーションを中止
      } else {
        next(true)
      }
    }
  },
  {
    path: '/Room/:id/:attri',
    name: 'Answer',
    component: AnswerPresentation,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
