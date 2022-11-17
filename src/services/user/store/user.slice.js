import { createSlice } from '@reduxjs/toolkit'

import { login as loginUser, signup as signupUser } from '../http/user-http'

import { refreshBeverages } from '../../beverage/store/beverage.slice'
import { refreshDevices } from '../../device/store/device.slice'
import { setAllFromAPI as setAllContainers } from '../../container/store/container.slice'
import { set as setToken } from '../../token/store/token.slice'


const initialState = {
  _id         : null,
  username    : null,
  email       : null,
  beverageList: [],
  deviceList  : [],
  remember    : false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action) => {
      if (!action.payload) return state
      
      const { _id, username, email, beverageList, deviceList, remember } = action.payload
      return {
        ...state,
        _id,
        username,
        email,
        beverageList,
        deviceList,
        remember
      }
    },
    clear: state => initialState,
    addBeverage: (state, action) => {
      state.beverageList = [...state.beverageList, action.payload]
    },
    addDevice: (state, action) => {
      state.deviceList = [...state.deviceList, action.payload]
    }
  }
})

export const { set, clear, addBeverage, addDevice } = userSlice.actions

export const selectIsLoggedIn = state => state.user._id !== null

export const selectProfile = state => ({ username: state.user.username, email: state.user.email })

function setUser(dispatch, user, token) {
  dispatch(set(user))
  dispatch(setToken(token))
  const refreshBeveragesThunk = refreshBeverages(user.beverageList)
  dispatch(refreshBeveragesThunk)
  const refreshDevicesThunk = refreshDevices(user.deviceList)
  dispatch(refreshDevicesThunk)
  const setAllContainersThunk = setAllContainers()
  dispatch(setAllContainersThunk)
}

export function login({ username, password, remember }) {
  return async dispatch => {
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
      setUser(dispatch, user, token)
    } catch(error) {
      console.log('login error', error)
    }
  }
}

export function signup({ username, password, email, remember }) {
  return async dispatch => {
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
      setUser(dispatch, user, token)
    } catch(error) {
      console.log('signup error', error)
    }
  }
}


export default userSlice.reducer
