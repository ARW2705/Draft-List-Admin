import { CLEAR_ALL } from '../../shared/constants/shared-event-names'
import { clear as clearUser } from '../../services/user/store/user.slice'
import { clear as clearToken } from '../../services/token/store/token.slice'
import { clear as clearDevices } from '../../services/device/store/device.slice'
import { clear as clearBeverages } from '../../services/beverage/store/beverage.slice'
import { clear as clearDrafts } from '../../services/draft/store/draft.slice'
import { clear as clearImages } from '../../services/image/store/image.slice'


export const clearAllStoresMiddleware = store => next => action => {
  if (action.type === CLEAR_ALL) {
    console.log('clearing all stores')
    next(clearUser())
    next(clearToken())
    next(clearDevices())
    next(clearBeverages())
    next(clearDrafts())
    next(clearImages())
  }

  return next(action)
}
