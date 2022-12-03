import store from '../../../app/store'
import { set } from './user.slice'
import { set as setToken } from '../../token/store/token.slice'
import { refreshBeverages } from '../../beverage/store/beverage.thunk'
import { refreshDevices } from '../../device/store/device.thunk'
import { setAllFromAPI as setAllContainers } from '../../container/store/container.thunk'

function refreshUserLists() {
  const { dispatch, getState } = store
  const { beverageList, deviceList } = getState().user
  const refreshBeveragesThunk = refreshBeverages(beverageList)
  dispatch(refreshBeveragesThunk)
  const refreshDevicesThunk = refreshDevices(deviceList)
  dispatch(refreshDevicesThunk)
  const setAllContainersThunk = setAllContainers()
  dispatch(setAllContainersThunk)
}


export {
  refreshUserLists
}
