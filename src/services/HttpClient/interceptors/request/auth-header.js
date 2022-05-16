const appendAuthorizationHeader = axiosRef => {
  axiosRef.interceptors.request.use(
    config => {
      const jwt = localStorage.getItem('accessToken')
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
