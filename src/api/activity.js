import request from "@/utils/request";

export function getActivityList(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/activity/search/getActivityList.do',
    method: 'post',
    data:query
  })
}

export function downlocalFile(url) {
  return request({
    baseURL: 'http://localhost:7080',
    url: `/file/downloadFileByUrl.do?url=${url}`,
    method: 'get'
  })
}

export function auditActivity(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/activity/update/auditActivity.do',
    method: 'post',
    data:query
  })
}

export function deleteActivityById(id) {
  return request({
    baseURL: 'http://localhost:7080',
    url: `/activity/delete/deleteActivityById.do/${id}`,
    method: 'get',
  })
}


export function getPassActivityList(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/activity/search/getPassActivityList.do',
    method: 'post',
    data:query
  })
}


