function selectDraft(state, draftId) {
  return state.drafts.find(draft => draft._id === draftId)
}

function selectDraftList(state, draftList) {
  return state.drafts.filter(draft => draftList.includes(draft._id))
}

function selectActiveDrafts(state) {
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


export {
  selectDraft,
  selectDraftList,
  selectActiveDrafts
}
