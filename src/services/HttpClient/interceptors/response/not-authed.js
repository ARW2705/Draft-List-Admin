import hardware from '../../../Hardware/Hardware.service'
import token from '../../../Token/Token.service'
import getCLientURL from '../../helpers/client-url'

const requestNewToken = async (axiosRef, originalConfig) => {
  const refreshToken = token.getToken('refreshToken')
  const hardwareId = hardware.getId()
  try {
    const refreshResponse = await axiosRef.post(getCLientURL('refresh'), { refreshToken, hardwareId })
    const { accessToken } = refreshResponse.data
    token.setToken('accessToken', accessToken)
    return axiosRef(originalConfig)
  } catch (error) {
    const { response } = error
    if (response.status === 403) {
      token.clearTokens()
      return Promise.reject({ reason: 'Refresh token failed' })
    } else if (response.status) {
      return Promise.reject(response)
    }
    return Promise.reject(error)
  }
}

const handleUnauthorizedResponse = axiosRef => {
  axiosRef.interceptors.response.use(
    response => response,
    error => {
      const { config, response } = error
      if (response.status === 401) {
        return requestNewToken(axiosRef, config)
      }
      return Promise.reject(error)
    }
  )
}

export default handleUnauthorizedResponse
