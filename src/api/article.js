import request from '@/utils/request'
import {ARTICLE_BASE_URL} from  './baseurl'

export function getArticlePage(params){  //获取用户文章分页
  return request({
    url:`${ARTICLE_BASE_URL}/user/article`,
    method:'get',
    params
  })
}

//添加文章
export function addArticle(data){
  return request({
    url:`${ARTICLE_BASE_URL}/user/article`,
    method:'post',
    data
  })
}

//修改文章
export function updateArticle(data){
  return request({
    url:`${ARTICLE_BASE_URL}/user/article/${data.articleId}`,
    method:'put',
    data
  })
}
