function parseErrorResponse(axiosRef) {
  axiosRef.interceptors.response.use(
    response => response,
    error => {
      console.log(error)
      const { response } = error
      if (response.hasOwnProperty('status')) {
        const errMsg = `<${response.status}> ${response.message}`
        return Promise.reject(errMsg)
      }
      return Promise.reject(error)
    }
  )
}

export default parseErrorResponse
