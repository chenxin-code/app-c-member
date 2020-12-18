import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const List = () => import ('@/view/propertyNotice/list');
const Detail  = () => import ('@/view/propertyNotice/detail');

const routes = [
  {
    path: '/',
    name: 'Member',
    component: Member,
  },
]

const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router