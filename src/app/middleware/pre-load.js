import { ON_INIT } from '../../shared/constants/shared-event-names'
import { setAllFromAPI as setAllContainers } from '../../services/container/store/container.slice'

export const preLoadDataMiddleware = store => next => action => {
  if (action.type === ON_INIT) {
    console.log('init load data')
    const setAllContainersThunk = setAllContainers()
    store.dispatch(setAllContainersThunk)
  }

  return next(action)
}
