import { useState, useEffect } from 'react';

import userData from './userData.json';
import './App.css';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import ContactForm from './components/ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { loadContacts } from './redux/contactsSlice';

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
console.log(contacts);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    console.log(savedContacts);
    
    if (savedContacts.length !== 0) {
      dispatch(loadContacts(savedContacts));
    } else {
      dispatch(loadContacts(userData));
      // localStorage.setItem('contacts', JSON.stringify(userData));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  ////////////////////////////////////////////////////////////
  // const getInitialContacts = () => {
  //   const initialContacts = JSON.parse(localStorage.getItem('contactElements'));

  //   if (!initialContacts || initialContacts.length === 0) {
  //     return userData;
  //   }
  //   return initialContacts;
  // };
  // const [contacts, setContacts] = useState(() => getInitialContacts());
  // const [findValue, setFindValue] = useState('');

  // useEffect(() => {
  //   localStorage.setItem('contactElements', JSON.stringify(contacts));
  // }, [contacts]);

  // const searchContact = contacts.filter(contact =>
  //   contact.name.toLowerCase(contact.name).includes(findValue.toLowerCase())
  // );
  // const addContactItem = newContactItem => {
  //   setContacts(prevContacts => {
  //     return [...prevContacts, newContactItem];
  //   });
  // };
  // const deleteContact = contactId => {
  //   setContacts(prevContacts => {
  //     return prevContacts.filter(prevContact => prevContact.id !== contactId);
  //   });
  // };

  return (
    <div className='wrapper'>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

export default App;
