import { get } from '../../HttpClient/HttpClient'
import { beverageRouteURL } from './beverage-route-url'


async function getBeverageById(id) {
  return await get(`${beverageRouteURL}/${id}`)
}

async function queryBeverages(type, term, page, count) {
  return await get(
    `${beverageRouteURL}/query`,
    {
      page,
      count,
      [type]: term
    }
  )
}


export {
  getBeverageById,
  queryBeverages
}
