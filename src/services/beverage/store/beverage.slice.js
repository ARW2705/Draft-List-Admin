import { createSlice } from '@reduxjs/toolkit'


const initialState = []

export const beveragesSlice = createSlice({
  name: 'beverages',
  initialState,
  reducers: {
    add   : (state, action) => [...state, action.payload],
    clear : () => initialState,
    remove: (state, action) => {
      const index = state.findIndex(beverage => beverage._id === action.payload._id)
      if (index === -1) return state
      state = [...state.slice(0, index), ...state.slice(index + 1)]
    },
    set   : (_, action) => action.payload,
    update: (state, action) => (
      state.map(beverage => beverage._id === action.payload._id ? action.payload : beverage)
    )
  }
})


export const { add, update, set, remove, clear } = beveragesSlice.actions

export default beveragesSlice.reducer
