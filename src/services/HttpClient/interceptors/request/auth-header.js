import token from '../../../Token/Token'

function appendAuthorizationHeader(axiosRef) {
  axiosRef.interceptors.request.use(
    config => {
      const jwt = token.getToken()
      config.headers["Authorization"] = `bearer ${jwt}`
      return config
    },
    error => {
      console.error(error)
      return Promise.reject(error)
    }
  )
}

export default appendAuthorizationHeader
