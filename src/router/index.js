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
      component: () => import('@views/home/Home'),
    },{
      path: 'classify',
      name: 'classify',
      component: () => import('@views/classify/Classify'),
      meta: { title: '文章分类' }    
    },{
      path: 'bookmark',
      name: 'bookmark',
      component: () => import('@views/bookmark/Bookmark'),
      meta: { title: '书签' }
    }]
  },  {
    path: '/article',
    name: 'Article',
    redirect:'/article/allArticle',
    component: Layout,
    meta: { title: '文章管理' },
    children: [{
      path: 'allArticle',
      name: 'allArticle',
      component: () => import('@views/article/AllArticle'),
      meta: { title: '所有文章' }
    } ,{
      path: 'editArticle',
      name: 'editArticle',
      component: () => import('@views/article/EditArticle'),
      meta: { title: '编辑文章' }
    }]
  }  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
