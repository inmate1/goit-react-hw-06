# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and
some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh

Создай репозиторий с названиемgoit-react-hw-06 При сдаче домашней работы
предоставляй две ссылки: одну на исходные файлы и другую на рабочую страницу
задания на Vercel . Проект должен быть создан с помощью Vite . При запуске кода
задания в консоли не должно быть ошибок или предупреждений. Для каждого
компонента в папке src/components есть отдельная папка, содержащая JSX файл
самого компонента React и файл его стилей. Название папки, файла компонента (с
расширением .jsx ) и файла стилей (перед .module.css ) одинаково и соответствует
названиям, указанным в заданиях (если они были). Для экспорта компонентов
используется экспорт по умолчанию (export default ) . JS-код должен быть чист и
понятен, используйте Prettier. Использованная библиотека Redux Toolkit
Стилизация должна быть выполнена с помощью CSS-модулей. Книга контактов Выполни
рефакторинг кода твоего приложения «Книга контактов» из домашнего задания
третьего модуля. Добавь управление состоянием с помощью библиотеки Redux Toolkit
вместо локального React состояния.

Папки и файлы

Создай папку src/reduxдля хранения файлов, связанных с логикой Redux: store.js-
файл создания стора contactsSlice.js- файл слайса для контактов filtersSlice.js-
файл слайса для фильтров

Начальное состояние Пусть исходное состояние Redux выглядит следующим образом.

{ contacts: { items: [] }, filters: { name: "" } } Здесь мы выделим два слайса –
контакты (поле contacts ) и фильтры (поле filters ).

Слайс контактов

В файле contactsSlice.jsобъяви слайс контактов, используя функцию createSlice().

Экшены слайса для использования в dispatch: addContact- добавление нового
контакта к свойствуitems deleteContact- удаление контакта по id из свойстваitems
Объявление функции-селекторы для использования в useSelector : selectContacts-
возвращает список контактов из свойства items. Из файла слайса экспортируй
редюсер, а также его экшены и селекторы.

Слайс фильтра В файле filtersSlice.jsобъяви слайс фильтра, используя функцию
createSlice(). Экшены слайса для использования в dispatch: changeFilter-
изменение значения фильтра в свойствеname Объявление функции-селекторы для
использования в useSelector : selectNameFilter- возвращает значение фильтра из
свойства name. Из файла слайса экспортируй редюсер, а также его экшены и
селекторы.

Библиотека React Redux Свяжи React-компоненты с Redux-логикой с помощью хуков
useSelectorи useDispatchбиблиотеки React Redux . Все компоненты, кроме карточки
контакта Contactв списке контактов ContactList, не должны принимать никаких
пропсов. Вместо этого компоненты должны использовать хук useSelectorи
функции-селекторы слайсов для получения необходимых им значений. Для отправки
экшенов компоненты используют хук useDispatchи ранее объявленные экшены слайсов:
Форма ContactsFormотправляет экшен добавления контакта при саммите Карта
контакта Contactотправляет экшен удаления контакта при клике по кнопке удаления
Поле фильтра SearchBox отправляет экшен смены фильтра при вводе в текстовое поле
Библиотека Redux Persist.
 Используй библиотеку Redux Persist для сохранения
массива контактов в локальном хранилище. В файле store.js : Создай конфигурацию
для сохранения поля items из слайса контактов. Используй persistReducer, чтобы
применить конфигурацию к редюсеру слайса контактов. Используй persistStoreдля
создания persistor для PersistGate.
npm i redux-persist
 Redux Toolkit Инструментарий Redux Redux
Toolkit устанавливается как стандартный пакет NPM.

npm install @reduxjs/toolkit

Используя Redux Toolkit, нет необходимости добавлять в проект пакет redux, кроме
случаев, когда вам необходима функция combineReducers(). Достаточно установить
@reduxjs/toolkit для написания логики Redux и react-redux связи стора с
компонентами.

npm install @reduxjs/toolkit react-redux

В файле store.js : Создай конфигурацию для сохранения поля items из слайса
контактов. Используй persistReducer, чтобы применить конфигурацию к редюсеру
слайса контактов. Используй persistStoreдля создания persistorдля PersistGate

Использование Redux DevTools: Redux DevTools – это инструмент для отладки
приложений на основе Redux. Он позволяет вам видеть действия, состояния и
временную шкалу изменений состояния вашего приложения. Подключите его к вашему
store npm install @redux-devtools/extension:

/////////////////////////// Также функция configureStore() может автоматически
создать корневой редюсер. Для этого необходимо передать свойства reducer объект
той же формы, что в combineReducers. Для начала удалим создание корневого
редюсера в нашем коде программы и добавим импорты редюсеров задач и фильтров из
файла src/redux/reducer.js. Опустим не критичный исходный код для того, чтобы
сократить объем примеров.

////////////////////////////////////////////

export const changeFilter = createAction('filter/name') export const
changeFilter = createReducer({ filters: { name: '', }, }, (builder) => {
builder.addCase(changeFilter.type, (state, { payload }) => ({ ...state, value:
payload, })) .addCase(changeFilter.type, (state, { payload }) => ({ ...state,
value: state.value - payload, })) }) Ваш код с использованием createSlice из
библиотеки Redux Toolkit содержит небольшую ошибку в редьюсере. Ошибка
заключается в том, что вы изменяете не совсем то свойство, которое нужно. Чтобы
исправить это, нужно в редьюсере изменить filters.name, а не просто name.

Вот исправленный код:

javascript Копировать код import { createSlice } from '@reduxjs/toolkit';

export const changeFilter = createSlice({ name: 'filter/name', initialState: {
filters: { name: '', }, }, reducers: { setName: (state, { payload }) => {
state.filters.name = payload; }, }, });

export const { setName } = changeFilter.actions; export default
changeFilter.reducer; Обратите внимание на следующие изменения:

В редьюсере, вместо name, используется setName, чтобы лучше отразить суть
действия. Внутри редьюсера, мы напрямую изменяем state.filters.name на payload.
Использование immer позволяет нам напрямую изменять состояние, и эти изменения
будут безопасно зафиксированы. Теперь вы можете использовать setName для
изменения значения фильтра name в вашем Redux состоянии.

куда импортируется const { setName } = changeFilter.actions;?

ChatGPT Константа setName, которая экспортируется из вашего слайса, должна быть
импортирована в компоненты или файлы, где вы планируете использовать это
действие для изменения состояния. Например, если у вас есть компонент, который
будет диспатчить это действие, импорт будет выглядеть следующим образом:

Предположим, у вас есть файл компонента MyComponent.js:

javascript Копировать код import React from 'react'; import { useDispatch,
useSelector } from 'react-redux'; import { setName } from
'./path/to/your/slice'; // импорт действия из вашего слайса

const MyComponent = () => { const dispatch = useDispatch(); const name =
useSelector(state => state.filter.filters.name);

const handleNameChange = (event) => { dispatch(setName(event.target.value)); };

return ( <div> <input type="text" value={name} onChange={handleNameChange} />
</div> ); };

export default MyComponent; Вот основные моменты:

Импорт действия: import { setName } from './path/to/your/slice'; Использование
useDispatch: Создаем dispatch для отправки действия. Использование useSelector:
Доступ к текущему состоянию name из Redux Store. Обработчик изменений: Функция
handleNameChange для обработки изменений в поле ввода и отправки действия
setName с новым значением. Не забудьте также настроить ваш Redux Store, чтобы
включить редьюсер из вашего слайса:

javascript Копировать код import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './path/to/your/slice';

const store = configureStore({ reducer: { filter: filterReducer, }, });

export default store; Этот код обеспечивает правильную интеграцию вашего Redux
слайса с компонентом React и позволяет эффективно управлять состоянием.
