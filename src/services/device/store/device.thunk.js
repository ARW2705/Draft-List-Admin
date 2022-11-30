import { add, set, update } from './device.slice'

import { getDeviceById, postDevice, patchDevice } from '../http/device-http'

import { addDevice as addDeviceToUserList } from '../../user/store/user.slice'

import buildGapRequests from '../../../shared/utilities/build-gap-requests'
import parseAllSettled  from '../../../shared/utilities/parse-all-settled'


function refreshDevices() {
  return async (dispatch, getState) => {
    const idList = getState().user.deviceList
    const requests = buildGapRequests(idList, [], getDeviceById)
    const responses = await Promise.allSettled(requests)
    const { values, errors } = parseAllSettled(responses)
    if (errors) console.log(errors)
    dispatch(set(values))
  }
}

function archiveDraft(deviceId, draftId) {
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

function getFromAPI(deviceId) {
  return async dispatch => {
    try {
      const deviceResponse = await getDeviceById(deviceId)
      dispatch(add(deviceResponse))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}

function addDevice(deviceData) {
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

function updateDevice(deviceId, deviceData) {
  return async dispatch => {
    try {
      const deviceResponse = await patchDevice(deviceId, deviceData)
      dispatch(update(deviceResponse))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}


export {
  refreshDevices,
  archiveDraft,
  getFromAPI,
  addDevice,
  updateDevice
}
