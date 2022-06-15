import authorization from './request/auth-header'
import contentType from './request/content-type-header'
import notAuthed from './response/not-authed'
import parseErrorResponse from './response/parse-error-response'

function intercept(axiosRef) {
  console.log('applying request and response interceptors')
  authorization(axiosRef)
  contentType(axiosRef)
  notAuthed(axiosRef)
  parseErrorResponse(axiosRef)
}

export default intercept
