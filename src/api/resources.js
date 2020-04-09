import request from '@/utils/request'
import {RESOURCES_BASE_URL} from  './baseurl'

//图片上传接口
export function imageUpLoad(formData) {
  return request({
    url: `${RESOURCES_BASE_URL}/resource/singleFileUpload`,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data:formData
  })
}
