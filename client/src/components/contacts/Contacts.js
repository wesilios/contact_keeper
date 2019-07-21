import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItems from './ContactItems';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map((contact, key) => (
        <ContactItems key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
};

export default Contacts;
