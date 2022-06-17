import { getBeverageById } from './Http/BeverageHttp'
import beverageStore from './Store/BeverageStore'
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
  console.log(idList)
  let storedBeverages = beverageStore.getBeverages(idList)
  if (idList.length === storedBeverages.length) {
    console.log('got beverages from store')
    return { beverages: storedBeverages, errors: [] }
  }

  const responses = await Promise.allSettled(buildRequests(idList, storedBeverages))
  console.log('got beverages from server')
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
