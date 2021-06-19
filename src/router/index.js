import Vue from 'vue'
import VueRouter from 'vue-router'

const firstpage = () => import('../view/firstpage/firstpage')
const community = () => import('../view/community/community')
const me = () => import('../view/me/me')
const teampage = () => import('../view/teampage/teampage')
const login = () => import('../view/login/login')

Vue.use(VueRouter)
const routes =[
   {
     path:'',
     redirect:'/firstpage'
   },
    {
      path:'/firstpage',
      component:firstpage,
      meta:{
        showTab:true
      }
    },
  {
    path:'/community',
    component:community,
    meta:{
      showTab:true
    }
  },
  {
    path:'/me',
    component:me,
    meta:{
      showTab:true
    }
  },
  {
    name: 'teampage',
    path:'/teampage/:teamId',
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
    mode:"history"
})


export default router
