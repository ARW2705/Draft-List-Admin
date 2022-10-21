import buildGapRequests from '../../shared/utilities/build-gap-requests'
import { getDevices, addDraftToDevice } from '../Device/Device'
import { getDraftById, postDraft, patchDraft } from './Http/DraftHttp'
import draftStore from './Store/DraftStore'
import { parseAllSettled } from '../../shared/utilities/parse-all-settled'


async function getDraft(draftId) {
  const storedDraft = await draftStore.getDraft(draftId)
  if (storedDraft) return storedDraft

  const response = await getDraftById(draftId)
  draftStore.setDraft(response)
  return response
}

async function getDraftListByIds(idList) {
  const storedDrafts = await draftStore.getDrafts(idList)
  if (idList.length === storedDrafts.length) {
    return { drafts: storedDrafts, errors: [] }
  }

  const responses = await Promise.allSettled(
    buildGapRequests(idList, storedDrafts, getDraftById)
  )
  const { values: drafts, errors } = parseAllSettled(responses)
  draftStore.setDrafts(drafts)
  return { drafts, errors }
}

/**
 * Get active drafts grouped by their parent device id
 * 
 * @param: none
 * @return: active drafts collection
 */
async function getActiveDrafts() {
  const { devices } = await getDevices()
  let activeDraftsByDevice = {}
  for (const device of devices) {
    const { drafts, errors } = await getDraftListByIds(device.draftList)
    const deviceName = device.title || device.name
    activeDraftsByDevice = {
      ...activeDraftsByDevice,
      [device._id]: { drafts, errors, deviceName }
    }
  }

  return activeDraftsByDevice
}

async function addNewDraft(deviceId, draftData) {
  const draftResponse = await postDraft(deviceId, draftData)
  draftStore.setDraft(draftResponse)
  addDraftToDevice(deviceId, draftResponse)
  return draftResponse
}

async function updateDraft(draftId, draftData) {
  const draftResponse = await patchDraft(draftId, draftData)
  draftStore.setDraft(draftResponse)
  return draftResponse
}

export {
  getActiveDrafts,
  getDraft,
  getDraftListByIds,
  addNewDraft,
  updateDraft
}
