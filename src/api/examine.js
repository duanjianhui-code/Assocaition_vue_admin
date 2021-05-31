import request from "@/utils/request";


export function getExamineList(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/examine/search/getExamineList.do',
    method: 'post',
    data:query
  })
}

export function auditExamine(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/examine/update/auditExamine.do',
    method: 'post',
    data:query
  })
}

export function deleteExamineById(id) {
  return request({
    baseURL: 'http://localhost:7080',
    url: `/examine/delete/deleteExamineById.do/${id}`,
    method: 'get',
  })
}

export function getPassExamineList(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/examine/search/getPassExamineList.do',
    method: 'post',
    data:query
  })
}
