import { get } from '../../HttpClient/HttpClient'
import { beverageRouteURL } from './beverage-route-url'


function getBeverageById(id) {
  return get(`${beverageRouteURL}/${id}`)
}

function getBeveragesByIdList(ids) {
  return get(`${beverageRouteURL}/query`, {}, { ids })
}


export {
  getBeverageById,
  getBeveragesByIdList
}
