import { get } from '../../HttpClient/HttpClient'
import { beverageRouteURL } from '../../shared/urls/beverage'


function getBeverageById(id) {
  return get(`${beverageRouteURL}/${id}`)
}


export {
  getBeverageById
}
