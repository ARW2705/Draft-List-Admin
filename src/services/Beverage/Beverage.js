import { getBeverageById, queryBeverages } from './Http/BeverageHttp'
import beverageStore from './Store/BeverageStore'
import beverageQuery from './Query/BeverageQuery'
import user from '../User/User'
import getPaginated from '../../shared/utilities/get-paginated'


function buildRequests(idList, storedBeverages) {
  return idList
    .map(id => {
      if (!storedBeverages.find(beverage => id === beverage._id)) {
        return getBeverageById(id)
      }
      return null
    })
    .filter(id => id !== null)
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
  const fromCache = beverageQuery.getIdsByQuery(type, term, page, count)
  if (fromCache.length === count) {
    return getBeverageListByIds(fromCache)
  }
  const fromServer = await queryBeveragesFromServer(type, term, page, count - fromCache.length)
  return {
    beverages: [...fromCache, ...(fromServer.beverages)],
    errors: [fromServer.error]
  }
}


export {
  getAuthoredBeverages,
  getPreviousBeverages,
  getBeveragesByQuery
}
