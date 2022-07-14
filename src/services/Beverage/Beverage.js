import { getBeverageById, queryBeverages, postBeverage, patchBeverage } from './Http/BeverageHttp'
import beverageStore from './Store/BeverageStore'
import beverageQuery from './Query/BeverageQuery'
import user from '../User/User'
import getPaginated from '../../shared/utilities/get-paginated'


function buildRequests(idList, storedBeverages) {
  return idList
    .map(id => {
      const fromStore = storedBeverages.find(beverage => id === beverage._id)
      if (fromStore) {
        return Promise.resolve(fromStore)
      }
      return getBeverageById(id)
    })
}

async function getBeverageListByIds(idList) {
  let storedBeverages = beverageStore.getBeverages(idList)
  if (idList.length === storedBeverages.length) {
    return { beverages: storedBeverages, errors: [] }
  }

  const responses = await Promise.allSettled(buildRequests(idList, storedBeverages))
  let beverages = [], errors = []
  responses.forEach(response => {
    if (response.status === 'fulfilled') {
      beverages = [...beverages, response.value]
    } else {
      errors = [...errors, response.reason]
    }
  })

  beverageStore.setBeverages(beverages)
  return { beverages, errors }
}

async function queryBeveragesFromServer(type, term, page, count) {
  try {
    const beverages = await queryBeverages(type, term, page, count)
    beverageQuery.cacheQuery(type, term, beverages)
    return beverages
  } catch(error) {
    return error
  }
}

async function getAuthoredBeverages(page, count) {
  return await getBeverageListByIds(getPaginated(user.getAuthoredList(), page, count))
}

async function getPreviousBeverages(page, count) {
  return await getBeverageListByIds(getPaginated(user.getPreviousList(), page, count))
}

async function getBeveragesByQuery(type, term, page, count) {
  const cachedIds = beverageQuery.getIdsByQuery(type, term, page, count)
  const fromCache = await getBeverageListByIds(cachedIds)
  if (fromCache.length === count) {
    return fromCache
  }

  const fromServer = await queryBeveragesFromServer(type, term, page, count - fromCache.length)
  const isErrorResponse = !Array.isArray(fromServer)
  let { beverages, errors } = fromCache
  console.log(fromCache, fromServer)
  if (isErrorResponse) {
    errors = [...errors, fromServer]
  } else {
    const unique = new Set()
    beverages.forEach(beverage => unique.add(beverage._id))
    fromServer.forEach(beverage => {
      if (!unique.has(beverage._id)) {
        beverages = [...beverages, beverage]
      }
    })
  }

  return { beverages, errors }
}

async function addNewBeverage(beverageData) {
  const beverageResponse = await postBeverage(beverageData)
  user.addBeverageToAuthoredList(beverageResponse)
  return beverageResponse
}

async function updateBeverage(beverageId, beverageData) {
  const beverageResponse = await patchBeverage(beverageId, beverageData)
  beverageStore.setBeverage(beverageResponse)
  return beverageResponse
}


export {
  getAuthoredBeverages,
  getPreviousBeverages,
  getBeveragesByQuery,
  addNewBeverage,
  updateBeverage
}
