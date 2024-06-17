import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './filters'

export default configureStore({
  reducer: {
    filtersSetting: filtersReducer,
  },
})