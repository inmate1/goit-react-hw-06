import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const changeContacts = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      state.items.push(payload);
    },
    deleteContact: (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    },
    initializeContacts: (state, action) => {
      if (state.items.length === 0) {
        state.items = action.payload;
      }
    },
  },
});

export const selectContacts = state => state.contacts.items;
export const { initializeContacts, addContact, deleteContact } =
  changeContacts.actions;
export const contactsReducer = changeContacts.reducer;
