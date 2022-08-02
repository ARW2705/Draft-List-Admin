import buildGapRequests from '../../shared/utilities/build-gap-requests'
import getPaginated from '../../shared/utilities/get-paginated'
import { getDevices, getDeviceById } from '../Device/Device'
import { getDraftById, postDraft } from './Http/DraftHttp'
import draftStore from './DraftStore/DraftStore'


async function getDraft(draftId) {
  const storedDraft = draftStore.getDraft(draftId)
  if (storedDraft) return storedDraft

  const response = await getDraftById(draftId)
  draftStore.setDraft(response)
  return response
}

async function getDraftListByIds(idList) {
  const storedDrafts = draftStore.getDrafts(idList)
  if (idList.length === storedDrafts.length) {
    return { drafts: storedDrafts, errors: [] }
  }

  const responses = await Promise.allSettled(
    buildGapRequests(idList, storedDrafts, getDraftById)
  )
  let drafts = [], errors = []
  responses.forEach(response => {
    if (response.status === 'fulfilled') {
      drafts = [...drafts, response.value]
    } else {
      errors = [...errors, response.reason]
    }
  })

  draftStore.setDrafts(drafts)
  return { drafts, errors }
}

async function getActiveDrafts() {
  const { devices } = await getDevices()
  let activeDraftsByDevice = {}
  for (const key in devices) {
    const { drafts, errors } = await getDraftListByIds(devices[key].draftList)
    activeDraftsByDevice = {
      ...activeDraftsByDevice,
      [devices[key]._id]: [...drafts, ...errors]
    }
  }

  return activeDraftsByDevice
}

async function addNewDraft(deviceId, draft) {
  const draftResponse = await postDraft(deviceId, draft)
  draftStore.setDraft(draftResponse)
  return draftResponse
}


export {
  getActiveDrafts,
  getDraft,
  addNewDraft
}
