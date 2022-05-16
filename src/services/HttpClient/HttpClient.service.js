import axios from 'axios'

import * as URL from './utilities/get-url.js'


class HttpClient {
  constructor() {
    if (HttpClient._instance) return HttpClient._instance
    HttpClient._instance = this
  }

  request(config) {
    return axios(config).then(response => response.data)
  }

  requestWithData(method, url, data) {
    return this.request({
      data,
      method,
      url
    })
  }

  requestWithoutData(method, url) {
    return this.request({
      method,
      url
    })
  }

  get(url) {
    return this.requestWithoutData('get', url)
  }

  post(url, data) {
    return this.requestWithData('post', url, data)
  }

  getUser() {
    return this.requestWithoutData('get', URL.getUserURL())
  }

  postUser(endpoint, data) {
    return this.requestWithData('post', URL.getUserURL(endpoint), data)
  }
}

export default HttpClient
