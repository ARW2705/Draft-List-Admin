import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    set: (state, action) => action.payload,
    clear: state => initialState
  }
})

export const { set, clear } = tokenSlice.actions

export default tokenSlice.reducer
