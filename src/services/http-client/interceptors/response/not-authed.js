function handleUnauthorizedResponse(axiosRef) {
  axiosRef.interceptors.response.use(
    response => response,
    async error => {
      const { response } = error
      if (response.status === 401) {
        // Handle token error
      }
      return Promise.reject(error)
    }
  )
}

export default handleUnauthorizedResponse
