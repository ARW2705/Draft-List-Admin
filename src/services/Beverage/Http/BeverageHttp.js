import { get, post } from '../../HttpClient/HttpClient'
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

async function postBeverage(beverageData) {
  const { data, image } = beverageData
  const header = { 'Content-Type': 'multipart/form-data' }
  const formData = new FormData()
  formData.append('data', JSON.stringify(data))
  if (image) {
    formData.append('image', image)
  }

  return await post(beverageRouteURL, formData, header)
}


export {
  getBeverageById,
  queryBeverages,
  postBeverage
}
