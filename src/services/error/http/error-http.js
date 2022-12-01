import { post } from '../../http-client/http-client.service'
import { errorRouteURL } from './error-route-url'

export async function reportError(error) {
  return await post(errorRouteURL, error)
}
