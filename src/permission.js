import router from './router'
import NProgress from 'nprogress'
import {getToken} from '@/utils/token'
import store from './store'
import 'nprogress/nprogress.css'

  NProgress.configure({ showSpinner: false })  

const whiteList = ['/login'] //拦截白名单

router.beforeEach(async (to, from, next) => {
    NProgress.start()
     const hasToken = getToken()
    if (hasToken) { //判断用户是否登录
      if (to.path === '/login') {   //用户已经登录 但是访问的是login页面 则跳转到主页
        next({ path: '/' })
        // NProgress.done()
      } else { //用户已经登录  判断是否有用户信息 
        const hasGetUserInfo = store.getters.nickName
        if (hasGetUserInfo) { //有用户信息 放行 
          next()
        } else {
          try {
            // 拉取用户信息 
            await store.dispatch('user/getInfo')
            //放行
            next()
          } catch (error) {
            // 发生异常 清除token 
            await store.dispatch('user/resetToken')
            Message.error(error || '用户信息拉取失败！')
            next(`/login?redirect=${to.path}`)
              NProgress.done()
          }
        }
      }
    } else {  //用户未登录 
      if (whiteList.indexOf(to.path) !== -1) { //白名单列表
        next()
      } else {
        // 无权限 重定向到 登录页
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  })
  
router.afterEach(() => {
    NProgress.done()
})
  