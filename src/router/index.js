import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@views/login/Login') 
  },
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',  //默认重定向到 home页面 
    component: Layout,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@views/home/Home') 
      // meta: { title: '肥宅基地-个人中心', icon: 'dashboard' }
    },{
      path: 'classify',
      name: 'classify',
      component: () => import('@views/classify/Classify') 
    },{
      path: 'bookmark',
      name: 'bookmark',
      component: () => import('@views/bookmark/Bookmark') 
    }]
  },  {
    path: '/article',
    name: 'Article',
    redirect:'/article/allArticle',
    component: Layout,
    children: [{
      path: 'allArticle',
      name: 'allArticle',
      component: () => import('@views/article/AllArticle') 
    } ,{
      path: 'editArticle',
      name: 'editArticle',
      component: () => import('@views/article/EditArticle') 
    }]
  }  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
