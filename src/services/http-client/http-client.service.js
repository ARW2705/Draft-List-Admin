import axios from 'axios'

import intercept from './interceptors/interceptors'


intercept(axios) // apply interceptors to axios instance

async function request(request) {
  const config = {
    ...request,
    validateStatus: status => status < 400
  }
  return (await axios(config)).data
}

async function get(url, params = {}, data = {}, responseType = {}) {
  return await request({ method: 'get', url, params, data, responseType })
}

async function post(url, data, headers = {}) {
  return await request({ method: 'post', url, data, headers })
}

async function patch(url, data, headers = {}) {
  return await request({ method: 'patch', url, data, headers })
}

export {
  get,
  post,
  patch
}
