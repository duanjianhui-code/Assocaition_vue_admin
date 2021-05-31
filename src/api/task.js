import request from "@/utils/request";

export function getTaskList() {
  return request({
    baseURL: 'http://localhost:7080',
    url: '/task/search/getTaskList.do',
    method: 'get'
  })
}
