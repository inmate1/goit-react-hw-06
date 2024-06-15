// import { combineReducers } from 'redux';

import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filtersSlice';




// создаем один reducer и передаем объект нашего стану
export const rootReducer = {
  contacts: contactsReducer,
  filters: filterReducer,
};
/////////////////////////////////////////////////////////
// export const store = configureStore({
//   reducer: rootReducer,

// }); 
