Для настройки redux-persist для сохранения массива контактов в localStorage,
следуйте этим шагам:

1. Установка библиотек Если у вас еще не установлены redux-persist и
   @reduxjs/toolkit, установите их:

npm install @reduxjs/toolkit redux-persist 2. Создание слайса контактов
Предположим, у вас есть начальный массив контактов userData. Создайте слайс для
контактов:

Ваша логика почти правильная, но, чтобы инициализация работала корректно при
удалении всех контактов и последующей перезагрузке страницы, нужно убедиться,
что действие initializeContacts выполняется только в том случае, если
localStorage пуст. Кроме того, необходимо использовать REHYDRATE для определения
состояния после восстановления из localStorage.

Вот правильная реализация:

Изменения в contactsSlice.js Убедитесь, что слайс правильно инициализирует
состояние:

javascript Копировать код // contactsSlice.js import { createSlice } from
'@reduxjs/toolkit';

const initialState = { items: [], // Изначально пусто };

const contactsSlice = createSlice({ name: 'contacts', initialState, reducers: {
initializeContacts: (state, action) => { if (state.items.length === 0) {
state.items = action.payload; } }, addContact: (state, { payload }) => {
state.items.push(payload); }, deleteContact: (state, { payload }) => {
state.items = state.items.filter(item => item.id !== payload); }, }, });

export const { initializeContacts, addContact, deleteContact } =
contactsSlice.actions; export default contactsSlice.reducer; Изменения в
store.js Измените store.js, чтобы правильно инициализировать состояние
контактов:

javascript

// store.js import { configureStore } from '@reduxjs/toolkit'; import storage
from 'redux-persist/lib/storage'; // defaults to localStorage for web import {
persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist'; import contactsReducer, { initializeContacts } from
'./contactsSlice'; import changeFilterReducer from './filtersSlice'; //
Предполагаем, что у вас есть другой слайс для фильтров import userData from
'../userData.json';

const persistConfig = { key: 'contacts', storage, whitelist: ['items'], };

const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

const rootReducer = { contacts: persistedContactsReducer, filters:
changeFilterReducer, };

const store = configureStore({ reducer: rootReducer, middleware:
getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: {
ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], }, }), });

// Создаем persistor const persistor = persistStore(store);

// Подписываемся на событие REHYDRATE для правильной инициализации
persistor.subscribe(() => { const state = store.getState(); if
(!state.contacts.items.length) { store.dispatch(initializeContacts(userData)); }
});

export { store, persistor }; Полный код Теперь ваш код будет правильно
инициализировать массив контактов userData, если все контакты удалены и страница
перезагружена.

Проверка и использование В index.js или App.js, где вы подключаете PersistGate,
убедитесь, что ваш код выглядит следующим образом:

javascript

// index.js или App.js import React from 'react'; import ReactDOM from
'react-dom'; import { Provider } from 'react-redux'; import { PersistGate } from
'redux-persist/integration/react'; import { store, persistor } from './store';
import App from './App';

ReactDOM.render( <Provider store={store}>
<PersistGate loading={null} persistor={persistor}> <App /> </PersistGate>
</Provider>, document.getElementById('root') ); Пример компонента для управления
контактами Пример компонента для управления контактами:

javascript Копировать код // ContactsComponent.js import React, { useState }
from 'react'; import { useDispatch, useSelector } from 'react-redux'; import {
addContact, deleteContact } from './contactsSlice';

const ContactsComponent = () => { const [name, setName] = useState(''); const
contacts = useSelector(state => state.contacts.items); const dispatch =
useDispatch();

const handleAddContact = () => { dispatch(addContact({ id: Date.now(), name }));
setName(''); };

const handleDeleteContact = (id) => { dispatch(deleteContact(id)); };

return ( <div> <h2>Contacts</h2> <input type="text" value={name} onChange={(e)
=> setName(e.target.value)} /> <button onClick={handleAddContact}>Add
Contact</button> <ul> {contacts.map(contact => ( <li key={contact.id}>
{contact.name} <button onClick={() =>
handleDeleteContact(contact.id)}>Remove</button> </li> ))} </ul> </div> ); };

export default ContactsComponent; Этот код обеспечивает правильную инициализацию
массива контактов userData, если все контакты удалены и страница перезагружена.
///////////////////////////////////// Подписка на событие REHYDRATE в
redux-persist используется для обработки восстановления состояния из
localStorage после инициализации приложения. Это особенно полезно для выполнения
дополнительных действий, когда состояние было восстановлено.

Что такое REHYDRATE? REHYDRATE - это действие, которое redux-persist
автоматически диспатчит, когда состояние приложения восстанавливается из
хранилища (например, localStorage). Это происходит после начальной загрузки
приложения, когда PersistGate завершает восстановление состояния.

Почему это важно? Когда все контакты удалены и состояние очищено в localStorage,
при перезагрузке страницы массив контактов userData должен быть повторно
инициализирован. Но при использовании redux-persist это не происходит
автоматически, поскольку состояние считается пустым. Поэтому мы добавляем
подписку на событие REHYDRATE, чтобы гарантировать, что userData будет
инициализирован в случае пустого состояния после восстановления.

Как это работает? Мы подписываемся на изменения состояния persistor и проверяем,
восстановлено ли состояние контактов. Если состояние контактов пустое после
восстановления, мы инициализируем его массивом userData.

Код Давайте разберем код:

javascript Копировать код // Создаем persistor const persistor =
persistStore(store);

// Подписываемся на событие REHYDRATE для правильной инициализации
persistor.subscribe(() => { const state = store.getState(); if
(!state.contacts.items.length) { store.dispatch(initializeContacts(userData)); }
}); Объяснение кода: Создание persistor:

javascript Копировать код const persistor = persistStore(store); persistor
используется для управления процессом сохранения и восстановления состояния
приложения. Он также предоставляет методы для подписки на события и очистки
сохраненного состояния.

Подписка на изменения состояния persistor:

javascript Копировать код persistor.subscribe(() => { Мы подписываемся на
изменения состояния persistor. Это гарантирует, что наша функция будет вызвана
каждый раз, когда состояние восстанавливается или изменяется.

Получение текущего состояния хранилища:

javascript Копировать код const state = store.getState(); Мы получаем текущее
состояние хранилища, чтобы проверить содержимое состояния контактов.

Проверка и инициализация состояния контактов:

javascript Копировать код if (!state.contacts.items.length) {
store.dispatch(initializeContacts(userData)); } Здесь мы проверяем, пустое ли
состояние контактов. Если оно пустое, мы инициализируем его массивом userData с
помощью диспатча действия initializeContacts.

Пример: Предположим, что localStorage пустой после удаления всех контактов. При
перезагрузке страницы:

redux-persist восстанавливает состояние (которое пустое) и диспатчит REHYDRATE.
Подписка на persistor активируется. Мы проверяем состояние контактов и видим,
что оно пустое. Диспатчим действие initializeContacts с userData, чтобы повторно
инициализировать контакты. Этот подход гарантирует, что даже после удаления всех
контактов и перезагрузки страницы, массив userData будет повторно
инициализирован, обеспечивая консистентность данных в приложении.
