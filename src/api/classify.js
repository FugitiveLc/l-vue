import {CLASSIFY_BASE_URL} from  './baseurl'
import request from '@/utils/request'

export function getAllClassify(){
   return request({
     url:`${CLASSIFY_BASE_URL}/user/category`,
     methods:'get'
   })
}