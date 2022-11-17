import { get, post, patch } from '../../HttpClient/HttpClient'
import { draftRouteURL } from './draft-route-url'


async function getDraftById(draftId) {
  return await get(`${draftRouteURL}/${draftId}`)
}

async function postDraft(deviceId, draftData) {
  return await post(`${draftRouteURL}/device/${deviceId}`, draftData)
}

async function patchDraft(draftId, draftData) {
  return await patch(`${draftRouteURL}/${draftId}`, draftData)
}


export {
  getDraftById,
  postDraft,
  patchDraft
}
