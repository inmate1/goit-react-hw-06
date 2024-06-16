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
// import { useDispatch } from 'react-redux';
// const dispatch = useDispatch();
///////////////////////////////

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['items'],
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);

const rootReducer = {
  contacts: persistedReducer,
  filters: changeFilterReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
// Инициализируем состояние контактами из userData, если localStorage пуст
// Подписываемся на событие REHYDRATE для правильной инициализации
persistor.subscribe(() => {
  const state = store.getState();
  if (!state.contacts.items.length) {
    store.dispatch(initializeContacts(userData));
  }
});

export { store, persistor };
