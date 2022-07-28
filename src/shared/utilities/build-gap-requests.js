function buildGapRequests(idList, storeList, getFn) {
  return idList
    .map(id => {
      const fromStore = storeList.find(item => id === item?._id)
      if (fromStore) {
        return Promise.resolve(fromStore)
      }

      return getFn(id)
    })
}

export default buildGapRequests
