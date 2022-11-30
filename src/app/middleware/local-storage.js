import { loadState, clearPersistentState } from '../persist/persist'
import { CLEAR_ALL, ON_INIT } from '../../shared/constants/shared-event-names'
import { set as setToken } from '../../services/token/store/token.slice'
import { set as setUser } from '../../services/user/store/user.slice'
import { set as setDevices } from '../../services/device/store/device.slice'
import { set as setBeverages } from '../../services/beverage/store/beverage.slice'
import { set as setDrafts } from '../../services/draft/store/draft.slice'
import { set as setContainers } from '../../services/container/store/container.slice'


export const localStorageMiddleware = store => next => action => {
  if (action.type === ON_INIT) {
    console.log('init from local storage')
    const devices = loadState('devices')
    const token = loadState('token')
    const user = loadState('user')
    const beverages = loadState('beverages')
    const drafts = loadState('drafts')
    const containers = loadState('containers')
    if (devices) next(setDevices(devices))
    if (token) next(setToken(token))
    if (user) next(setUser(user))
    if (beverages) next(setBeverages(beverages))
    if (drafts) next(setDrafts(drafts))
    if (containers) next(setContainers(containers))
  }

  if (action.type === CLEAR_ALL) {
    console.log('clear all local storage')
    clearPersistentState()
  }

  return next(action)
}
