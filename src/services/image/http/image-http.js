import { get } from '../../http-client/http-client.service'
import { imageRouteURL } from './image-route-url'


async function getImage(url) {
  return await get(`${imageRouteURL}/${url}`, {}, {}, 'blob')
}


export {
  getImage
}
