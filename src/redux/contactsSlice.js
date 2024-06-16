import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [], // Предположим, что userData определен и содержит начальный массив контактов
};

console.log(initialState.items);


const changeContacts = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    initializeContacts: (state, action) => {
      if (state.items.length === 0) {
        state.items = action.payload;
      }
    },
    addContact: (state, { payload }) => {
      state.items.push(payload);
    },
    deleteContact: (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    },
  },
});

export const { initializeContacts, addContact, deleteContact } = changeContacts.actions;
export const contactsReducer = changeContacts.reducer;
