import { createSlice } from '@reduxjs/toolkit'

import { getBeverageById, postBeverage, patchBeverage } from '../http/beverage-http'

import { addBeverage as addBeverageToUserList } from '../../../services/user/store/user.slice'

import parseAllSettled  from '../../../shared/utilities/parse-all-settled'
import buildGapRequests from '../../../shared/utilities/build-gap-requests'
import matchQuery       from '../../../shared/utilities/match-query'


const initialState = []

export const beveragesSlice = createSlice({
  name: 'beverages',
  initialState,
  reducers: {
    add: (state, action) => [...state, action.payload],
    update: (state, action) => state.map(beverage => beverage._id === action.payload._id ? action.payload : beverage),
    set: (state, action) => action.payload,
    remove: (state, action) => {
      const index = state.findIndex(beverage => beverage._id === action.payload._id)
      if (index === -1) return state
      state = [...state.slice(0, index), ...state.slice(index + 1)]
    },
    clear: state => initialState
  }
})

export const { add, update, set, remove, clear } = beveragesSlice.actions

export const selectBeverage = (state, beverageId) => {
  return state.beverages.find(beverage => beverage._id === beverageId)
}

export const selectBeverageIds = state => {
  return state.beverages.map(beverage => beverage._id)
}

export const selectBeverageQuery = (state, searchType, searchTerm) => {
  return matchQuery(state.beverages, searchType, searchTerm, '_id')
}

export function refreshBeverages() {
  return async (dispatch, getState) => {
    const idList = getState().user.beverageList
    const requests = buildGapRequests(idList, [], getBeverageById)
    const responses = await Promise.allSettled(requests)
    const { values, errors } = parseAllSettled(responses)
    if (errors) console.log(errors)
    dispatch(set(values))
  }
}

export function getFromAPI(beverageId) {
  return async dispatch => {
    try {
      const beverageResponse = await getBeverageById(beverageId)
      dispatch(add(beverageResponse))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}

export function addBeverage(beverageData) {
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

export function updateBeverage(beverageId, beverageData) {
  return async dispatch => {
    try {
      const beverageResponse = await patchBeverage(beverageId, beverageData)
      dispatch(update(beverageResponse))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}

export default beveragesSlice.reducer
