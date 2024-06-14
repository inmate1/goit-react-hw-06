
import css from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';

const ContactList = () => {
  // Извлекаем данные из store, компоненты должны подписаться на необходимые им части состояния Redux. Для этого в библиотеке React Redux есть хук  useSelector(selector) Аргументом он принимает функцию, которая объявляет один параметр  state  – весь объект состояния Redux, который будет автоматически передан функции хуком  useSelector . Эта функция называется селектором и должна вернуть только ту часть состояния, которая необходима компоненту.
 const contacts = useSelector(state => state.contacts.items);
 const filter = useSelector(state => state.filters.name);

 const items = contacts.filter(contact =>
   contact.name.toLowerCase().includes(filter.toLowerCase())
 );
  console.log(items);

  return (
    <ul className={css.contactList}>
      {items.map(({ id, name, number }) => (
        <Contact key={id} id={id} name={name} number={number} />
      ))}
    </ul>
  );
};


export default ContactList;
