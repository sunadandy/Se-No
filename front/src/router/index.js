import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import RoomView from '@/views/RoomView'
import RoomForm from '@/components/RoomForm'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/RoomForm',
    name: 'RoomForm',
    component: RoomForm
  },
  {
    path: '/Room/:id',
    name: 'RoomView',
    component: RoomView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
