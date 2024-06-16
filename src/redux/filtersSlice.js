import { createSlice } from '@reduxjs/toolkit';

const changeFilter = createSlice({
  name: 'filter/name',
  initialState: {
    name: '',
  },
  reducers: {
    selectNameFilter: (state, { payload }) => {
      //selectNameFilter функция  createAction
      state.name = payload;
    },
  },
});

export const { selectNameFilter } = changeFilter.actions;
export const changeFilterReducer = changeFilter.reducer;
