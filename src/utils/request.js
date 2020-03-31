import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import {getToken,setToken} from '@/utils/token'
const service = axios.create({
  // baseURL: '/', // url  
  timeout: 5000 // request timeout
})

// request 拦截处理
service.interceptors.request.use(
  config => {
    if (getToken()) {  //当有token的时候 在请求头加上token
      config.headers['Authorization'] =getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截处理
service.interceptors.response.use(
  response => {
    const res = response.data
    // 当响应码不为200的时候 请求失败  
    if (res.code !== 0) {    
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      //  token失效 
      if (res.code === 101 ) {
        // to re-login
        // MessageBox.confirm('登录信息已失效 请重新登录', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      //存储 token
      if(res.token){
        setToken(res.token)
      }
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
