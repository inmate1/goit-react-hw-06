import { createSlice } from '@reduxjs/toolkit';

const changeFilter = createSlice({
  name: 'filter/name',
  initialState: {
      name: '',
  
  },
  reducers: {
    selectNameFilter: (state, { payload }) => {  //Функция  createAction(type)
     
        state.name = payload
    
    },
  },
});

// Обратите внимание на следующие изменения:
// В редьюсере, вместо name, используется setName, чтобы лучше отразить суть действия.
// Внутри редьюсера, мы напрямую изменяем state.filters.name на payload. Использование immer позволяет нам напрямую изменять состояние, и эти изменения будут безопасно зафиксированы.
export const { selectNameFilter } = changeFilter.actions;
export const changeFilterReducer = changeFilter.reducer;