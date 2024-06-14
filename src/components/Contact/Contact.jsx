import css from './Contact.module.css';
import PropTypes from 'prop-types';
import { FaPhone } from 'react-icons/fa6';
import { IoPersonSharp } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';




const Contact = ({ id, name, number }) => {
  // Для того чтобы известить страницу о том, что в интерфейсе произошло какое-либо событие, необходимо отправить экшен. Для этого в библиотеке React Redux есть хук  useDispatch() , который возвращает ссылку на функцию отправки экшенов  dispatch  с объекта, созданного нами ранее, стором Redux.
  // Получаем ссылку на функцию отправки экшенов
  const dispatch = useDispatch();

  const handleDeleteContact = contactId => {
    console.log(contactId);
    // Вызываем генератор экшена
    // и передаем текст задания для поля payload
    // Отправляем результат – экшен для создания задачи
    // Импортируем deleteContact
    dispatch(deleteContact(contactId));
  };
  return (
    <li className={css.listItem} id={id}>
      <div>
        <div className={css.text}>
          <IconContext.Provider value={{ color: 'black', size: '16' }}>
            <IoPersonSharp />
          </IconContext.Provider>
          <p>{name}</p>
        </div>
        <div className={css.text}>
          <IconContext.Provider value={{ color: 'black', size: '16' }}>
            <FaPhone />
          </IconContext.Provider>

          <p>{number}</p>
        </div>
      </div>
      <button
        className={css.btnContact}
        type='button'
        aria-label='delete'
        onClick={() => handleDeleteContact(id)}>
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
   id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default Contact;
