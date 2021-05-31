import request from '@/utils/request'

export function addAnnouncement(query) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/announcement/create/addAnnouncement.do',
    method: 'post',
    data:query
  })
}

export function getEmails() {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/announcement/search/getEmails.do',
    method: 'get',
  })
}

export function sendEmail(data) {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/announcement/create/sendEmail.do',
    method: 'post',
    data
  })
}
