import request from '@/utils/request'
import {ARTICLE_BASE_URL} from  './baseurl'

export function getArticlePage(params){  //获取用户文章分类
  return request({
    url:`${ARTICLE_BASE_URL}/user/article`,
    method:'get',
    params
  })
}