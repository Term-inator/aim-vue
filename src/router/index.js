import Vue from 'vue'
import VueRouter from 'vue-router'

const firstpage = () => import('../view/firstpage/firstpage')
const community = () => import('../view/community/community')
const user = () => import('../view/user/user')
const teampage = () => import('../view/teampage/teampage')
const login = () => import('../view/login/login')

Vue.use(VueRouter)
const routes = [
  {
    name: 'firstpage',
    path: '/firstpage/:userId',
    component: firstpage,
    meta: {
      showTab: true
    }
  },
  {
    name: 'community',
    path: '/community',
    component: community,
    meta: {
      showTab: true
    }
  },
  {
    name: 'user',
    path: '/user/:userId',
    component: user,
    meta: {
      showTab: true
    }
  },
  {
    name: 'teampage',
    path: '/teampage/:teamId',
    component: teampage,
    meta: {
      showTab: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: login,
    meta: {
      showTab: true
    }
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

router.beforeEach((to, from, next) => {
  if (to.name != 'login') {
    if (!localStorage.getItem("token")) {
      router.replace({name: 'login'})
    }
  }
  next()
})

export default router
