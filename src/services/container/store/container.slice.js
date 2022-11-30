import { createSlice } from '@reduxjs/toolkit'


const initialState = []

export const containersSlice = createSlice({
  name: 'containers',
  initialState,
  reducers: {
    set  : (_, action) => action.payload ?? initialState,
    clear: () => initialState
  }
})


export const { set, clear } = containersSlice.actions

export default containersSlice.reducer
