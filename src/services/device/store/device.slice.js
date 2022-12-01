import { createSlice } from '@reduxjs/toolkit'


const initialState = []

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    add: (state, action) => [...state, action.payload],
    addDraft: (state, action) => {
      const { deviceId, draftId } = action.payload
      const device = state.find(_device => _device._id === deviceId)
      device.draftList.push(draftId)
    },
    clear: () => initialState,
    set: (state, action) => action.payload ?? state,
    remove: (state, action) => {
      const index = state.findIndex(device => device._id === action.payload._id)
      if (index === -1) return state
      return [...state.slice(0, index), ...state.slice(index + 1)]
    },
    update: (state, action) => {
      return state.map(device => device._id === action.payload._id ? action.payload : device)
    },
  }
})


export const { add, update, set, remove, clear, addDraft } = devicesSlice.actions

export default devicesSlice.reducer
