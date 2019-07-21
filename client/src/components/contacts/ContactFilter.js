import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { Form } from 'semantic-ui-react';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContact, clearFilter, filtered } = contactContext;
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <Form>
      <input
        type='text'
        ref={text}
        onChange={onChange}
        name='text'
        placeholder='Filter Contacts'
      />
    </Form>
  );
};

export default ContactFilter;
