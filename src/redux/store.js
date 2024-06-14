// В файле store.js :
// Создай конфигурацию для сохранения поля items из слайса контактов.
// Используй persistReducer, чтобы применить конфигурацию к редюсеру слайса контактов.
// Используй persistStoreдля создания persistorдля PersistGate
//
// Использование Redux DevTools:
// Redux DevTools – это инструмент для отладки приложений на основе Redux. Он позволяет вам видеть действия, состояния и временную шкалу изменений состояния вашего приложения.
// Подключите его к вашему store npm install @redux-devtools/extension:

import { composeWithDevTools } from '@redux-devtools/extension';

import { combineReducers, createStore } from 'redux';

import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filtersSlice';

// const installState = {
//   //переносим в combineReducers
//   contacts: {
//     items: [...userData],
//   },
//   filters: {
//     name: '',
//   },
// };
// Екшени слайса для використання в dispatch:
// export const addContact = value => {
//   console.log(value);
//   return {
//     type: 'contacts/add',
//     payload: value,
//   };
// };

// export const deleteContact = contactId => {
//   console.log(contactId);
//   return { type: 'contacts/delete',
//     payload: contactId,
//   };
// };
// // Добавим экшен и обработку для инициализации контактов из localStorage.
// export const addContactsFromLocalStorage = contacts => ({
//   type: 'contacts/addMultiple',
//   payload: contacts,
// });

// export const changeFilter = searchName => ({
//   type: 'search/name',
//   payload: searchName,
// });

// // Пока используем редюсер который
// // только возвращает полученное состояние
// const reducer = (state = installState, action) => {
//   // Редюсер различает экшены по значению свойства type
//   switch (action.type) {
//     // В зависимости от типа экшена будет выполняться разная логика
//     case 'contacts/add':
//       const newState = {
//         ...state,
//         contacts: {
//           ...state.contacts,
//           items: [...state.contacts.items, action.payload],
//         },
//       };
//       console.log('New State:', newState);
//       return newState;
//     // Требуется вернуть новый объект состояния
//     //   return {
//     //     // в котором есть все данные существующего состояния
//     //     ...state,
//     //     // и новый массив задач
//     //     contacts: {
//     //       // в котором есть все существующие задания
//     //       ...state.contacts,
//     //       // и о новой задачи
//     //       items: [...state.contacts.items, action.payload],
//     //     },
//     //   };
//     case 'contacts/delete':
//       return {
//         ...state,
//         contacts: {
//           // в котором есть все существующие задания
//           ...state.contacts,
//           // и о новой задачи
//           items: state.contacts.items.filter(
//             item => item.id !== action.payload
//           ),
//         },
//       };
//     case 'search/name':
//       return {
//         ...state,
//         filters: {
//           // в котором есть все существующие задания
//           ...state.filters,
//           // и о новой задачи
//           name: action.payload,
//         },
//       };
//     default:
//       // Каждый редюсер получает все экшены, отправленные в с.
//       // Если редюсер не должен обрабатывать какой-либо тип экшена, необходимо вернуть имеющееся состояние без изменений. return state;
//       return state;
//   }
// };
// //////////слайсим редюсеры
// const contactsReducer = (state = { items: [] }, action) => {
//   // Редюсер различает экшены по значению свойства type
//   switch (action.type) {
//     // В зависимости от типа экшена будет выполняться разная логика
//     case 'contacts/add':
//       // Требуется вернуть новый объект состояния
//       return {
//         // в котором есть все данные существующего состояния
//         ...state,
//         // и новый массив задач

//         // в котором есть все существующие задания

//         // и о новой задачи
//         items: [...state.items, action.payload],
//       };
//     //////////////////////////////////
//     case 'contacts/delete':
//       return {
//         ...state,

//         // в котором есть все существующие задания

//         // и о новой задачи
//         items: state.items.filter(item => item.id !== action.payload),
//       };
//     case "contacts/addMultiple":
//       return {
//         ...state,
//         items: [...action.payload]
//       }
//     default:
//       // Каждый редюсер получает все экшены, отправленные в с.
//       // Если редюсер не должен обрабатывать какой-либо тип экшена, необходимо вернуть имеющееся состояние без изменений. return state;
//       return state;
//   }
// };

// const filterReducer = (state = { name: '' }, action) => {
//   // Редюсер различает экшены по значению свойства type
//   switch (action.type) {
//     // В зависимости от типа экшена будет выполняться разная логика

//     case 'search/name':
//       return {
//         ...state,
    
//           // в котором есть все существующие задания
          
//           // и о новой задачи
//           name: action.payload,
       
//       };

//     default:
//       // Каждый редюсер получает все экшены, отправленные в с.
//       // Если редюсер не должен обрабатывать какой-либо тип экшена, необходимо вернуть имеющееся состояние без изменений. return state;
//       return state;
//   }
// };

// создаем один reducer и передаем объект нашего стану
const reducer = combineReducers({
  contacts: contactsReducer,
  filters: filterReducer,
});
/////////////////////////////////////////////////////////
export const store = createStore(reducer, composeWithDevTools()); //Для создания стора есть функция  createStore(), которая принимает несколько параметров и возвращает новый объект стори.
