import { get } from '../../http-client/http-client.service'
import { containerRouteURL } from './container-route-url'


async function getAllContainers() {
  return await get(`${containerRouteURL}`)
}

async function getContainerById(containerId) {
  return await get(`${containerRouteURL}/${containerId}`)
}


export {
  getAllContainers,
  getContainerById
}
