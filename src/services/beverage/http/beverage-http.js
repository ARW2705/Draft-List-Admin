import { get, patch, post } from '../../http-client/http-client.service'
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
      [type.toLowerCase()]: term.toLowerCase()
    }
  )
}

function buildFormData(beverageData) {
  const { data, image } = beverageData
  const formData = new FormData()
  formData.append('data', JSON.stringify(data))
  if (image) {
    formData.append('image', image)
  }
  return formData
}

async function postBeverage(beverageData) {
  return await post(
    beverageRouteURL,
    buildFormData(beverageData),
    { 'Content-Type': 'multipart/form-data' }
  )
}

async function patchBeverage(beverageId, beverageData) {
  return await patch(
    `${beverageRouteURL}/${beverageId}`,
    buildFormData(beverageData),
    { 'Content-Type': 'multipart/form-data' }
  )
}


export {
  getBeverageById,
  queryBeverages,
  postBeverage,
  patchBeverage
}
