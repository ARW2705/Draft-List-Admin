import { createSlice } from '@reduxjs/toolkit'

import { getAllContainers } from '../http/container-http'


const initialState = []

export const containersSlice = createSlice({
  name: 'containers',
  initialState,
  reducers: {
    set: (state, action) => action.payload ?? initialState,
    clear: () => initialState
  }
})

export const { set, clear } = containersSlice.actions

export const selectContainer = (state, containerId) => {
  return state.containers.find(container => container._id === containerId)
}

export function setAllFromAPI() {
  return async dispatch => {
    try {
      const containersResponse = await getAllContainers()
      dispatch(set(containersResponse))
    } catch (error) {
      console.log('fetch error', error)
    }
  }
}

export default containersSlice.reducer
