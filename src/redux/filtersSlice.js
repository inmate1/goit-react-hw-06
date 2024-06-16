import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
  }
const changeFilter = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setNameFilter: (state, { payload }) => {
      state.name = payload;
    },
  },
});
export const selectNameFilter = state => state.filters.name;
export const { setNameFilter } = changeFilter.actions;
export const changeFilterReducer = changeFilter.reducer;
