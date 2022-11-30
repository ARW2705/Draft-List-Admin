import { refreshBeverages } from '../../beverage/store/beverage.thunk'
import { refreshDevices } from '../../device/store/device.thunk'
import { setAllFromAPI as setAllContainers } from '../../container/store/container.thunk'


function refreshUserLists(dispatch, getState) {
  const { user } = getState()
  const refreshBeveragesThunk = refreshBeverages(user.beverageList)
  dispatch(refreshBeveragesThunk)
  const refreshDevicesThunk = refreshDevices(user.deviceList)
  dispatch(refreshDevicesThunk)
  const setAllContainersThunk = setAllContainers()
  dispatch(setAllContainersThunk)
}


export {
  refreshUserLists
}
