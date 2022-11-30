import { createSlice } from '@reduxjs/toolkit'


const initialState = []

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    add: (state, action) => [...state, action.payload],
    addMany: (state, action) => {
      action.payload.forEach(draft => {
        if (!state.find(_draft => _draft._id === draft._id)) {
          state.push(draft)
        }
      })
    },
    update: (state, action) => {
      return state.map(draft => draft._id === action.payload._id ? action.payload : draft)
    },
    set: (state, action) => action.payload ?? state,
    remove: (state, action) => {
      const index = state.findIndex(draft => draft._id === action.payload)
      if (index === -1) return state
      return [...state.slice(0, index), ...state.slice(index + 1)]
    },
    clear: () => initialState
  }
})


export const { add, addMany, update, set, remove, clear } = draftsSlice.actions

export default draftsSlice.reducer
