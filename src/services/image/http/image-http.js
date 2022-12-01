import { get } from '../../HttpClient/HttpClient'
import { imageRouteURL } from './image-route-url'


async function getImage(url) {
  return await get(`${imageRouteURL}/${url}`, {}, {}, 'blob')
}


export {
  getImage
}
