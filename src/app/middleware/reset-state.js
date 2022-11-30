import { RESET_STATE } from '../../shared/constants/shared-event-names'
import { clear as clearDevices } from '../../services/device/store/device.slice'
import { clear as clearBeverages } from '../../services/beverage/store/beverage.slice'
import { clear as clearDrafts } from '../../services/draft/store/draft.slice'
import { refreshUserLists } from '../../services/user/store/user.thunk'


export const resetStateMiddleware = store => next => action => {
  if (action.type === RESET_STATE) {
    console.log('resetting state')
    next(clearDevices())
    next(clearBeverages())
    next(clearDrafts())
    refreshUserLists(store.dispatch, store.getState)
  }

  return next(action)
}
