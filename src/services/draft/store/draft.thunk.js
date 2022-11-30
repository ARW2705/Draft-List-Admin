import { add, addMany, update } from './draft.slice'

import { getDraftById, postDraft, patchDraft } from '../http/draft-http'

import { addDraft as addDraftToDevice } from '../../device/store/device.slice'

import buildGapRequests from '../../../shared/utilities/build-gap-requests'
import parseAllSettled  from '../../../shared/utilities/parse-all-settled'


function getDrafts(idList) {
  return async dispatch => {
    const responses = await Promise.allSettled(buildGapRequests(idList, [], getDraftById))
    const { values, errors } = parseAllSettled(responses)
    if (errors) console.log(errors)
    dispatch(addMany(values))
  }
}

function getFromAPI(draftId) {
  return async dispatch => {
    try {
      const draftResponse = await getDraftById(draftId)
      dispatch(add(draftResponse))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}

function addDraft(deviceId, draftData) {
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

function updateDraft(draftId, draftData) {
  return async dispatch => {
    try {
      const draftResponse = await patchDraft(draftId, draftData)
      dispatch(update(draftResponse))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}


export {
  getDrafts,
  getFromAPI,
  addDraft,
  updateDraft
}
