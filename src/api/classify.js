import {CLASSIFY_BASE_URL} from  './baseurl'
import request from '@/utils/request'

export function getAllClassify(){  //获取用户文章分类
   return request({
     url:`${CLASSIFY_BASE_URL}/user/category`,
     method:'get'
   })
}

export function updateClassifyById(categoryId,params){  //修改用户文章分类
  return request({
    url:`${CLASSIFY_BASE_URL}/user/category/${categoryId}`,
    method:'put',
    params
  })
}
export function changeClassifyDisplay(categoryId,displayStatus){  //修改用户文章分类
  return request({
    url:`${CLASSIFY_BASE_URL}/user/category/${categoryId}/display/${displayStatus}`,
    method:'put'
  })
}
export function addClassifyById(params){  //修改用户文章分类
  return request({
    url:`${CLASSIFY_BASE_URL}/user/category`,
    method:'post',
    params
  })
}

 