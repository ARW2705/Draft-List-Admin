import storageService from '../../Storage/Storage'
import { DRAFTS_STORE_NAME } from '../../../shared/constants/db-store-names'


class DraftStore {
  constructor() {
    if (DraftStore._instance) return DraftStore._instance
    DraftStore._instance = this
  }

  async getDraft(id) {
    return await storageService.get(DRAFTS_STORE_NAME, id)
  }

  async getDrafts(ids) {
    return (await storageService.getMany(DRAFTS_STORE_NAME, ids)).filter(draft => !!draft)
  }

  async setDraft(draft) {
    await storageService.set(DRAFTS_STORE_NAME, draft)
  }

  async setDrafts(drafts) {
    await storageService.setMany(DRAFTS_STORE_NAME, drafts)
  }
}

const draftStore = new DraftStore()

export default draftStore
