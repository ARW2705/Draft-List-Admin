import store from '../../../../app/store'

function appendAuthorizationHeader(axiosRef) {
  axiosRef.interceptors.request.use(
    async config => {
      const jwt = store.getState().token
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
