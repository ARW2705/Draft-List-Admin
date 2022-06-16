import axios from 'axios'

import intercept from './interceptors/interceptors'


intercept(axios) // apply interceptors to axios instance

async function request(config) {
  return await axios(config).data
}

function get(url, params = {}, data = {}) {
  return request({ method: 'get', url, params, data })
}

function post(url, data) {
  return request({ method: 'post', url, data })
}

function patch(url, data) {
  return request({ method: 'patch', url, data })
}

export {
  get,
  post,
  patch
}
