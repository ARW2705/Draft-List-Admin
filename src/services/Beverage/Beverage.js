import { getBeverageById } from './Http/BeverageHttp'
import beverageStore from './Store/BeverageStore'
import user from '../User/User'
import getPaginated from '../../shared/utilities/get-paginated'


function buildRequests(idList, storedBeverages) {
  return idList
    .map(id => {
      if (!storedBeverages.find(beverage => id === beverage._id)) {
        return getBeverageById(id)
          .then(beverages => ({ status: 'fulfilled', value: beverages }))
          .catch(error => ({ status: 'rejected', reason: error }))
      }
      return null
    })
    .filter(request => request !== null)
}

async function getBeverageListByIds(idList) {
  let storedBeverages = beverageStore.getBeverages(idList)
  if (idList.length === storedBeverages.length) {
    return { beverages: storedBeverages, errors: [] }
  }

  const responses = await Promise.all(buildRequests(idList, storedBeverages))
  let beverages = [], errors = []
  responses.forEach(response => {
    if (response.status === 'fulfilled') {
      beverages = [...beverages, ...response.value]
    } else {
      errors = [...errors, ...response.reason]
    }
  })

  beverageStore.setBeverages(beverages)
  return { beverages, errors }
}

async function getAuthoredBeverages(page, count) {
  return await getBeverageListByIds(getPaginated(user.getAuthoredList(), page, count))
}

async function getPreviouslyUsedBeverages(page, count) {
  return await getBeverageListByIds(getPaginated(user.getPreviousList(), page, count))
}


export {
  getAuthoredBeverages,
  getPreviouslyUsedBeverages
}
