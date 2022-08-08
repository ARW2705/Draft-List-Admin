import { get } from '../../HttpClient/HttpClient'
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
