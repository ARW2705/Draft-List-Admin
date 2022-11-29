import { post } from '../../HttpClient/HttpClient'
import { errorRouteURL } from './error-route-url'

export async function reportError(error) {
  return await post(errorRouteURL, error)
}
