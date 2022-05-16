import axios from 'axios'
import getClientURL from './utilities/client-url'


class HttpClient {
  constructor() {
    if (HttpClient._instance) return HttpClient._instance
    HttpClient._instance = this
  }

  request(config) {
    return axios(config).then(response => response.data)
  }

  requestWithData(method, endpoint, data) {
    return this.request({
      data,
      method,
      url: getClientURL(endpoint)
    })
  }

  requestWithoutData(method, endpoint) {
    return this.request({
      method,
      url: getClientURL(endpoint)
    })
  }

  get(endpoint) {
    return this.requestWithoutData('get', endpoint)
  }
}
