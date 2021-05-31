import request from "@/utils/request";

export function getStatistical() {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/statistical/search/getStatistical.do',
    method: 'get'
  })
}
