// import { get}

class DraftStore {
  constructor() {
    if (DraftStore._instance) return DraftStore._instance
    DraftStore._instance = this
    this.storageKey = 'drafts'
    this.drafts = {}
  }

  setDraft(draft) {
    if (draft.hasOwnProperty('_id')) {
      draft = this.prepareDraft(draft)
    }
    this.drafts = { ...this.drafts, ...draft }
    console.log('new draft store', this.drafts)
  }

  setDrafts(drafts) {
    this.setDraft(drafts.reduce((acc, curr) => ({ ...acc, ...this.prepareDraft(curr)}), {}))
  }

  prepareDraft(draft) {
    return { [draft._id]: draft }
  }

  getDraft(draftId) {
    return this.drafts[draftId]
  }

  getDrafts(draftIds) {
    return draftIds.map(draftId => this.getDraft(draftId)).filter(draft => !!draft)
  }

  clearDrafts() {
    this.drafts = {}
    this.storeDrafts()
  }

  loadDrafts() {
    this.drafts = JSON.parse(localStorage.getItem(this.storageKey))
  }

  storeDrafts() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.drafts))
  }
}

const draftStore = new DraftStore()

export default draftStore
