import { getBeverageById as getBeverageByIdFromServer, queryBeverages, postBeverage, patchBeverage } from './Http/BeverageHttp'
import beverageStore from './Store/BeverageStore'
import beverageQuery from './Query/BeverageQuery'
import user from '../User/User'
import getPaginated from '../../shared/utilities/get-paginated'
import { parseAllSettled } from '../../shared/utilities/parse-all-settled'


function buildRequests(idList, storedBeverages) {
  return idList
    .map(id => {
      const fromStore = storedBeverages.find(beverage => id === beverage._id)
      if (fromStore) {
        return Promise.resolve(fromStore)
      }
      return getBeverageByIdFromServer(id)
    })
}

async function getBeverageListByIds(idList) {
  let storedBeverages = await beverageStore.getBeverages(idList)
  if (idList.length === storedBeverages.length) {
    return { beverages: storedBeverages, errors: [] }
  }

  const responses = await Promise.allSettled(buildRequests(idList, storedBeverages))
  const { values: beverages, errors } = parseAllSettled(responses)
  await beverageStore.setBeverages(beverages)
  return { beverages, errors }
}

async function queryBeveragesFromServer(type, term, page, count) {
  try {
    const beverages = await queryBeverages(type, term, page, count)
    await beverageQuery.setQuery(type, term, beverages)
    return beverages
  } catch(error) {
    return error
  }
}

async function getBeverageList(page, count) {
  return await getBeverageListByIds(getPaginated(user.getBeverageList(), page, count))
}

async function getBeveragesByQuery(type, term, page, count) {
  const cachedIds = await beverageQuery.getByQuery(type, term, page, count)
  let { beverages, errors } = await getBeverageListByIds(cachedIds)
  if (beverages.length === count) {
    return beverages
  }

  const beveragesFromServer = await queryBeveragesFromServer(type, term, page, count - beverages.length)
  const isErrorResponse = !Array.isArray(beveragesFromServer)
  if (isErrorResponse) {
    errors = [...errors, beveragesFromServer]
  } else {
    const unique = new Set()
    beverages.forEach(beverage => unique.add(beverage._id))
    beveragesFromServer.forEach(beverage => {
      if (!unique.has(beverage._id)) {
        beverages = [...beverages, beverage]
      }
    })
  }

  return { beverages, errors }
}

async function getBeverageById(beverageId) {
  const fromStorage = await beverageStore.getBeverage(beverageId)
  if (fromStorage) return fromStorage

  const response = await getBeverageByIdFromServer(beverageId)
  await beverageStore.setBeverage(response)
  return response
}

async function addNewBeverage(beverageData) {
  const beverageResponse = await postBeverage(beverageData)
  user.addBeverageToList(beverageResponse)
  return beverageResponse
}

async function updateBeverage(beverageId, beverageData) {
  const beverageResponse = await patchBeverage(beverageId, beverageData)
  await beverageStore.setBeverage(beverageResponse)
  return beverageResponse
}


export {
  getBeverageList,
  getBeveragesByQuery,
  getBeverageById,
  addNewBeverage,
  updateBeverage
}
