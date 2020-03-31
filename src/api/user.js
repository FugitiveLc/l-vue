import request from '@/utils/request'

//登录  
export function login(params) {
  return request({
    url: '/user/login',
    method: 'post',
    params
  })
}

//拉取用户信息
export function getUserInfo(){
  return request({
    url:'/user',
    method:'post'
  })
}