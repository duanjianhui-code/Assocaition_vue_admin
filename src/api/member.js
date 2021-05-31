import request from "@/utils/request";

export function getMemberListByAssId(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/member/search/getMemberListByAssId.do',
    method: 'post',
    data:query
  })
}


export function addAssocaitionManage(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/member/create/addAssocaitionManage.do',
    method: 'post',
    data:query
  })
}

export function getMemberList(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/member/search/getMemberList.do',
    method: 'post',
    data:query
  })
}

export function getPassMemberList(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/member/search/getPassMemberList.do',
    method: 'post',
    data:query
  })
}

export function auditMember(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/member/update/auditMember.do',
    method: 'post',
    data:query
  })
}

export function deleteMemberById(id) {
  return request({
    baseURL: 'http://localhost:7080',
    url: `/member/delete/deleteMemberById.do/${id}`,
    method: 'get',
  })
}
