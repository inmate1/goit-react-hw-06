// В файле contactsSlice.js объяви слайс контактов, используя функцию createSlice().
// Экшены слайса для использования в dispatch:
// addContact- добавление нового контакта к свойству items
// deleteContact- удаление контакта по id из свойства items
// Объявление функции-селекторы для использования в useSelector :
// selectContacts- возвращает список контактов из свойства items.
// Из файла слайса экспортируй редюсер, а также его экшены и селекторы.
import userData from '../userData.json';
export const addContact = value => {
  console.log(value);
  return {
    type: 'contacts/add',
    payload: value,
  };
};

export const deleteContact = contactId => {
  console.log(contactId);
  return { type: 'contacts/delete', payload: contactId };
};

export const loadContacts = contacts => {
  return {
    type: 'contacts/load',
    payload: contacts,
  };
};


export const contactsReducer = (state = { items: []}, action) => {
  // Редюсер различает экшены по значению свойства type
  switch (action.type) {
    // В зависимости от типа экшена будет выполняться разная логика
    case 'contacts/add':
      // Требуется вернуть новый объект состояния
      return {
        // в котором есть все данные существующего состояния
        ...state,
        // и новый массив задач

        // в котором есть все существующие задания

        // и о новой задачи
        items: [...state.items, action.payload],
      };
    //////////////////////////////////
    case 'contacts/delete':
      return {
        ...state,

        // в котором есть все существующие задания

        // и о новой задачи
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'contacts/load':
      return {
        ...state,
        items: action.payload,
      };

    default:
      // Каждый редюсер получает все экшены, отправленные в с.
      // Если редюсер не должен обрабатывать какой-либо тип экшена, необходимо вернуть имеющееся состояние без изменений. return state;
      return state;
  }
};