import token from '../../../Token/Token'


function handleUnauthorizedResponse(axiosRef) {
  axiosRef.interceptors.response.use(
    response => response,
    error => {
      const { response } = error
      if (response.status === 401) {
        token.removeToken()
        // Handle token expired
        return Promise.resolve()
      }
      return Promise.reject(error)
    }
  )
}

export default handleUnauthorizedResponse
