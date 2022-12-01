import matchQuery from '../../../shared/utilities/match-query'


function selectBeverage(state, beverageId) {
  return state.beverages.find(beverage => beverage._id === beverageId)
}

function selectBeverageIdsHelper(beverages, shouldBeArchived) {
  return beverages
    .map(beverage => beverage.isArchived === shouldBeArchived ? beverage._id : null)
    .filter(id => !!id)
}

function selectActiveBeverageIds(state) {
  return selectBeverageIdsHelper(state.beverages, false)
}

function selectArchivedBeverageIds(state) {
  return selectBeverageIdsHelper(state.beverages, true)
}

function selectBeverageQuery(state, searchType, searchTerm) {
  return matchQuery(state.beverages, searchType, searchTerm)
}

function selectBeverageQueryId(state, searchType, searchTerm) {
  return matchQuery(state.beverages, searchType, searchTerm, '_id')
}


export {
  selectBeverage,
  selectActiveBeverageIds,
  selectArchivedBeverageIds,
  selectBeverageQuery,
  selectBeverageQueryId
}
