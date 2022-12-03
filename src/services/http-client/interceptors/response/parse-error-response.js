import PublicError from "../../../../shared/types/PublicError"

function parseErrorResponse(axiosRef) {
  axiosRef.interceptors.response.use(
    response => response,
    error => {
      console.log(error)
      const { response, message } = error
      let parsedError = error
      if (response?.status) {
        let errMsg
        if (response.data) {
          errMsg = response.data.error?.message || response.data.message
        } else {
          errMsg = `<${response.status}> ${response.message || response.statusText}`
        }

        parsedError = new PublicError(message, 'HTTP Error', errMsg)
      }

      return Promise.reject(parsedError)
    }
  )
}

export default parseErrorResponse
