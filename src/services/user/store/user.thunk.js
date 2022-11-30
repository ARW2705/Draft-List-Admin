import { set } from './user.slice'
import { refreshUserLists } from './user.action'

import { login as loginUser, signup as signupUser } from '../http/user-http'

import { set as setToken } from '../../token/store/token.slice'


function login({ username, password, remember }) {
  return async (dispatch, getState) => {
    try {
      const response = await loginUser({ username, password })
      const { _id, email, beverageList, deviceList, token } = response
      const user = {
        _id,
        username,
        email,
        beverageList,
        deviceList,
        remember
      }
      dispatch(set(user))
      dispatch(setToken(token))
      refreshUserLists(dispatch, getState)
    } catch(error) {
      console.log('login error', error)
    }
  }
}

function signup({ username, password, email, remember }) {
  return async (dispatch, getState) => {
    try {
      const response = await signupUser({ username, password, email })
      const { _id, beverageList, deviceList, token } = response
      const user = {
        _id,
        username,
        email,
        beverageList,
        deviceList,
        remember
      }
      dispatch(set(user))
      dispatch(setToken(token))
      refreshUserLists(dispatch, getState)
    } catch(error) {
      console.log('signup error', error)
    }
  }
}


export {
  refreshUserLists,
  login,
  signup
}
