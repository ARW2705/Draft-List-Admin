import { removeToken } from '../../../token/token'

function handleUnauthorizedResponse(axiosRef) {
  axiosRef.interceptors.response.use(
    response => response,
    async error => {
      const { response } = error
      if (response.status === 401) {
        removeToken()
        // Handle token expired
        return Promise.resolve()
      }
      return Promise.reject(error)
    }
  )
}

export default handleUnauthorizedResponse
