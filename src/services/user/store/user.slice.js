import { createSlice } from '@reduxjs/toolkit'


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
    clear: () => initialState,
    addBeverage: (state, action) => {
      state.beverageList = [...state.beverageList, action.payload]
    },
    addDevice: (state, action) => {
      state.deviceList = [...state.deviceList, action.payload]
    }
  }
})


export const { set, clear, addBeverage, addDevice } = userSlice.actions

export default userSlice.reducer
