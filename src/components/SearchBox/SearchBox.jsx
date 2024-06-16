import css from './SearchBox.module.css';
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNameFilter } from '../../redux/filtersSlice';

const SearchBox = () => {
  const inputId = useId();
  // Для того чтобы известить страницу о том, что в интерфейсе произошло какое-либо событие, необходимо отправить экшен. Для этого в библиотеке React Redux есть хук  useDispatch() , который возвращает ссылку на функцию отправки экшенов  dispatch  с объекта, созданного нами ранее, стором Redux.
  // Получаем ссылку на функцию отправки экшенов
  //
  const name = useSelector(store => store.filters.name);
  // Вызываем генератор экшена useDispatch()
  // и передаем текст задания для поля payload
  // Отправляем результат – экшен для создания задачи
  const dispatch = useDispatch();

  const selectName = value => {
    dispatch(selectNameFilter(value));
    //   contacts.filter(contact =>
    //   contact.name.toLowerCase(contact.name).includes(findValue.toLowerCase())
    // );
  };
  return (
    <div className={css.wrapper}>
      <label htmlFor={inputId}>Find contacts by name</label>
      <input
        className={css.searchInput}
        type='search'
        name='input'
        id={inputId}
        value={name}
        onChange={evt => selectName(evt.target.value)}
      />
    </div>
  );
};

export default SearchBox;
