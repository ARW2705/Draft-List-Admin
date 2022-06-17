import axios from 'axios'

import intercept from './interceptors/interceptors'


intercept(axios) // apply interceptors to axios instance

async function request(config) {
  const response = await axios(config)
  return response.data
}

async function get(url, params = {}, data = {}) {
  return await request({ method: 'get', url, params, data })
}

async function post(url, data) {
  return await request({ method: 'post', url, data })
}

async function patch(url, data) {
  return await request({ method: 'patch', url, data })
}

export {
  get,
  post,
  patch
}
