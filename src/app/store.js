import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import beveragesReducer  from '../services/beverage/store/beverage.slice'
import containersReducer from '../services/container/store/container.slice'
import devicesReducer    from '../services/device/store/device.slice'
import draftsReducer     from '../services/draft/store/draft.slice'
import tokenReducer      from '../services/token/store/token.slice'
import userReducer       from '../services/user/store/user.slice'

import { localStorageMiddleware } from './middleware/local-storage'
import { clearAllStoresMiddleware } from './middleware/clear-all'
import { preLoadDataMiddleware } from './middleware/pre-load'
import { resetStateMiddleware } from './middleware/reset-state'

import { persistState, clearPersistentState } from './persist/persist'

import { ON_INIT } from '../shared/constants/shared-event-names'


const store = configureStore({
  reducer: {
    beverages : beveragesReducer,
    containers: containersReducer,
    devices   : devicesReducer,
    drafts    : draftsReducer,
    token     : tokenReducer,
    user      : userReducer
  },
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware().concat([
      thunkMiddleware,
      localStorageMiddleware,
      preLoadDataMiddleware,
      clearAllStoresMiddleware,
      resetStateMiddleware
    ])
  )
})

store.subscribe(() => {
  const state = store.getState()
  if (state.user.remember) {
    for (const key in state) {
      persistState(key, state)
    }
  } else {
    clearPersistentState()
  }
})

store.dispatch({ type: ON_INIT })

export default store
