import { createSlice } from '@reduxjs/toolkit'

import { getDraftById, postDraft, patchDraft } from '../http/draft-http'

import { addDraft as addDraftToDevice } from '../../device/store/device.slice'

import buildGapRequests from '../../../shared/utilities/build-gap-requests'
import parseAllSettled  from '../../../shared/utilities/parse-all-settled'


const initialState = []

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    add: (state, action) => [...state, action.payload],
    addMany: (state, action) => {
      action.payload.forEach(draft => {
        if (!state.find(_draft => _draft._id === draft._id)) {
          state.push(draft)
        }
      })
    },
    update: (state, action) => {
      return state.map(draft => draft._id === action.payload._id ? action.payload : draft)
    },
    set: (state, action) => action.payload ?? state,
    remove: (state, action) => {
      const index = state.findIndex(draft => draft._id === action.payload)
      if (index === -1) return state
      return [...state.slice(0, index), ...state.slice(index + 1)]
    },
    clear: state => initialState
  }
})

export const { add, addMany, update, set, remove, clear } = draftsSlice.actions

export function selectDraft(state, draftId) {
  return state.drafts.find(draft => draft._id === draftId)
}

export function selectDraftList(state, draftList) {
  return state.drafts.filter(draft => draftList.includes(draft._id))
}

export function selectActiveDrafts(state) {
  const devices = state.devices
  let activeDraftsByDevice = {}
  for (const device of devices) {
    const deviceName = device.title || device.name
    activeDraftsByDevice = {
      ...activeDraftsByDevice,
      [device._id]: { draftIds: device.draftList, deviceName }
    }
  }

  return activeDraftsByDevice
}

export function getDrafts(idList) {
  return async dispatch => {
    const responses = await Promise.allSettled(buildGapRequests(idList, [], getDraftById))
    const { values, errors } = parseAllSettled(responses)
    if (errors) console.log(errors)
    dispatch(addMany(values))
  }
}

export function getFromAPI(draftId) {
  return async dispatch => {
    try {
      const draftResponse = await getDraftById(draftId)
      dispatch(add(draftResponse))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}

export function addDraft(deviceId, draftData) {
  return async dispatch => {
    try {
      const draftResponse = await postDraft(deviceId, draftData)
      dispatch(add(draftResponse))
      dispatch(addDraftToDevice({ deviceId, draftId: draftResponse._id }))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}

export function updateDraft(draftId, draftData) {
  return async dispatch => {
    try {
      const draftResponse = await patchDraft(draftId, draftData)
      dispatch(update(draftResponse))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}

export default draftsSlice.reducer
