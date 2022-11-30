import { add, set, update } from './beverage.slice'
import { addBeverage as addBeverageToUserList } from '../../user/store/user.slice'

import { getBeverageById, postBeverage, patchBeverage } from '../http/beverage-http'

import parseAllSettled  from '../../../shared/utilities/parse-all-settled'
import buildGapRequests from '../../../shared/utilities/build-gap-requests'


function refreshBeverages() {
  return async (dispatch, getState) => {
    const idList = getState().user.beverageList
    const requests = buildGapRequests(idList, [], getBeverageById)
    const responses = await Promise.allSettled(requests)
    const { values, errors } = parseAllSettled(responses)
    if (errors) console.log(errors)
    dispatch(set(values))
  }
}

function getFromAPI(beverageId) {
  return async dispatch => {
    try {
      const beverageResponse = await getBeverageById(beverageId)
      dispatch(add(beverageResponse))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}

function addBeverage(beverageData) {
  return async dispatch => {
    try {
      const beverageResponse = await postBeverage(beverageData)
      dispatch(add(beverageResponse))
      dispatch(addBeverageToUserList(beverageResponse._id))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}

function updateBeverage(beverageId, beverageData) {
  return async dispatch => {
    try {
      const beverageResponse = await patchBeverage(beverageId, beverageData)
      dispatch(update(beverageResponse))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}


export {
  refreshBeverages,
  getFromAPI,
  addBeverage,
  updateBeverage
}
