import { createSlice } from '@reduxjs/toolkit'

import { getDeviceById, postDevice, patchDevice } from '../http/device-http'

import { addDevice as addDeviceToUserList } from '../../user/store/user.slice'

import buildGapRequests from '../../../shared/utilities/build-gap-requests'
import parseAllSettled  from '../../../shared/utilities/parse-all-settled'


const initialState = []

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    add: (state, action) => [...state, action.payload],
    update: (state, action) => {
      return state.map(device => device._id === action.payload._id ? action.payload : device)
    },
    set: (state, action) => action.payload ?? state,
    remove: (state, action) => {
      const index = state.findIndex(device => device._id === action.payload._id)
      if (index === -1) return state
      return [...state.slice(0, index), ...state.slice(index + 1)]
    },
    clear: () => initialState,
    addDraft: (state, action) => {
      const { deviceId, draftId } = action.payload
      const device = state.find(_device => _device._id === deviceId)
      device.draftList.push(draftId)
    }
  }
})

export const { add, update, set, remove, clear, addDraft } = devicesSlice.actions

export const selectDevice = (state, deviceId) => {
  return state.devices.find(device => device._id === deviceId)
}

export const selectDeviceIds = state => {
  return state.devices.map(device => device._id)
}

export function refreshDevices() {
  return async (dispatch, getState) => {
    const idList = getState().user.deviceList
    const requests = buildGapRequests(idList, [], getDeviceById)
    const responses = await Promise.allSettled(requests)
    const { values, errors } = parseAllSettled(responses)
    if (errors) console.log(errors)
    dispatch(set(values))
  }
}

export function archiveDraft(deviceId, draftId) {
  return async (dispatch, getState) => {
    const device = getState().devices.find(device => device._id === deviceId)
    const targetDraftIndex = device.draftList.findIndex(draft => draft === draftId)
    if (targetDraftIndex === -1) {
      throw new Error('Draft does not belong to device')
    }

    const draftToArchive = device.draftList[targetDraftIndex]
    const updatedDraftList = [...device.draftList.slice(0, targetDraftIndex), ...device.draftList.slice(targetDraftIndex + 1)]
    const previousDraftIndex = device.previousDraftList.findIndex(previous => previous.draft === draftId)
    let updatedPreviousDraftList
    if (previousDraftIndex === -1) {
      updatedPreviousDraftList = [...device.previousDraftList, { count: 1, draft: draftToArchive }]
    } else {
      updatedPreviousDraftList = device.previousDraftIndex
        .map((previousDraft, index) => {
          return index === previousDraftIndex ? { ...previousDraft, count: previousDraft.count + 1 } : previousDraft
        })
    }

    const updatedDeviceBody = {
      ...device,
      draftList: updatedDraftList,
      previousDraftList: updatedPreviousDraftList
    }

    const updatedDevice = await patchDevice(deviceId, { data: updatedDeviceBody })
    dispatch(update(updatedDevice))
  }
}

export function getFromAPI(deviceId) {
  return async dispatch => {
    try {
      const deviceResponse = await getDeviceById(deviceId)
      dispatch(add(deviceResponse))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}

export function addDevice(deviceData) {
  return async dispatch => {
    try {
      const deviceResponse = await postDevice(deviceData)
      dispatch(add(deviceResponse))
      dispatch(addDeviceToUserList(deviceResponse._id))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}

export function updateDevice(deviceId, deviceData) {
  return async dispatch => {
    try {
      const deviceResponse = await patchDevice(deviceId, deviceData)
      dispatch(update(deviceResponse))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}

export default devicesSlice.reducer
