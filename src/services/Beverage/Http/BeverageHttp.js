import { get } from '../../HttpClient/HttpClient'
import { beverageRouteURL } from './beverage-route-url'


async function getBeverageById(id) {
  return await get(`${beverageRouteURL}/${id}`)
}

export {
  getBeverageById
}
