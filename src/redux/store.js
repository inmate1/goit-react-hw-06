import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { contactsReducer, initializeContacts } from './contactsSlice';
import { changeFilterReducer } from './filtersSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import userData from '../userData.json';

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['items'],
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);

const store = configureStore({
  reducer: {
    contacts: persistedReducer,
    filters: changeFilterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
persistor.subscribe(() => {
  const state = store.getState();
  if (!state.contacts.items.length) {
    store.dispatch(initializeContacts(userData));
  }
});

export { store, persistor };
