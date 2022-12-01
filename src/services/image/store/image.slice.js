import { createSlice } from '@reduxjs/toolkit'


const initialState = {}

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    set: (state, action) => {
      const { url, image } = action.payload
      return {
        ...state,
        [url]: image
      }
    },
    clear: () => initialState
  }
})

export const { set, clear } = imagesSlice.actions

export default imagesSlice.reducer
