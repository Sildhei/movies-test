import { createSlice } from '@reduxjs/toolkit'

export const filtersSlice = createSlice({
  name: 'nameFilter',
  initialState: {
    name: '',
    genre: ''
  },
  reducers: {
    nameSetting: (state, action) => {
      state.name = action.payload
    },
    genreSetting: (state, action) => {
        state.genre = action.payload
      },
  },
})

export const { nameSetting, genreSetting } = filtersSlice.actions

export default filtersSlice.reducer