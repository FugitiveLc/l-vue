import request from '@/utils/request'
import {USER_BASE_URL} from  './baseurl'
//登录  
export function login(params) {
  return request({
    url: `${USER_BASE_URL}/user/login`,
    method: 'post',
    params
  })
}

//拉取用户信息
export function getUserInfo(){
  return request({
    url:`${USER_BASE_URL}/user`,
    method:'post'
  })
}