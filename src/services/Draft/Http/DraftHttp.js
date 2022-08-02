import { get, post, patch } from '../../HttpClient/HttpClient'
import { draftRouteURL } from './draft-route-url'


async function getDraftById(draftId) {
  return await get(`${draftRouteURL}/${draftId}`)
}

async function postDraft(deviceId, draft) {
  return await post(`${draftRouteURL}/devices/${deviceId}`, draft)
}


export {
  getDraftById,
  postDraft
}
