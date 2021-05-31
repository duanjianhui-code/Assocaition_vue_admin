import request from '@/utils/request'

export function getAssocaitionList(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/assocaition/search/getAssocaitionList.do',
    method: 'post',
    data:query
  })
}

export function getPassAssocaitionList(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/assocaition/search/getPassAssocaitionList.do',
    method: 'post',
    data:query
  })
}

export function deleteAssocationById(id) {
  return request({
    baseURL: 'http://localhost:7080',
    url: `/assocaition/delete/deleteAssocationById.do/${id}`,
    method: 'delete',
  })
}

export function updateAssocation(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: `/assocaition/update/auditAssocation.do`,
    method: 'post',
    data:query
  })
}

export function getpolicy() {
  return request({
    baseURL: 'http://localhost:7080',
    url: `/assocaition/search/getpolicy.do`,
    method: 'get'
  })
}

export function addAssocaitionChil(data) {
  return request({
    baseURL: 'http://localhost:7080',
    url: `/assocaition/create/addAssocaitionChil.do`,
    method: 'post',
    data
  })
}

export function getAssocaitionChil() {
  return request({
    baseURL: 'http://localhost:7080',
    url: `/assocaition/search/getAssocaitionChil.do`,
    method: 'get',
  })
}

export function getAssocaitionChilMems(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: `/assocaition/search/getAssocaitionChilMems.do`,
    method: 'post',
    data: query
  })
}

export function updateStatus(id,status) {
  return request({
    baseURL: 'http://localhost:7080',
    url: `/assocaition/update/updateStatus.do`,
    method: 'post',
    data:{status,id}
  })
}

export function getMyAssocation() {
  return request({
    baseURL: 'http://localhost:7080',
    url: `/assocaition/search/getMyAssocation.do`,
    method: 'get'
  })
}

export function upAssocation(data) {
  return request({
    baseURL: 'http://localhost:7080',
    url: `/assocaition/update/upAssocation.do`,
    method: 'post',
    data
  })
}


