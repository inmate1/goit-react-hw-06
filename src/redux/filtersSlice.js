// В файле filtersSlice.js объяви слайс фильтра, используя функцию createSlice().
// Экшены слайса для использования в dispatch:
// changeFilter- изменение значения фильтра в свойствеname
// Объявление функции-селекторы для использования в useSelector :
// electNameFilter- возвращает значение фильтра из свойства name.
// Из файла слайса экспортируй редюсер, а также его экшены и селекторы.
// Экшены

import { createAction } from "@reduxjs/toolkit";

// export const changeFilter = searchName => ({
//   type: 'search/name',
//   payload: searchName,
// });
//Функция  createAction(type)  упрощает процесс объявления экшенов. В качестве аргумента она принимает строку описывающую тип действия и возвращает генератор экшена.
export const changeFilter = createAction('search/name');



export const filterReducer = (state = { name: '' }, action) => {
  // Редюсер различает экшены по значению свойства type
  switch (action.type) {
    // В зависимости от типа экшена будет выполняться разная логика

    case changeFilter.type: //В редюсере импортируем экшены и используем их свойство  type для замены строк внутри инструкции  switch.
      return {
        ...state,

        // в котором есть все существующие задания

        // и о новой задачи
        name: action.payload,
      };

    default:
      // Каждый редюсер получает все экшены, отправленные в с.
      // Если редюсер не должен обрабатывать какой-либо тип экшена, необходимо вернуть имеющееся состояние без изменений. return state;
      return state;
  }
};