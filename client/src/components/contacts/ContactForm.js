import React, { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, current, clearCurrent } = contactContext;
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const clearAll = () => {
    clearCurrent();
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const { name, email, phone, type } = contact;
  return (
    <>
      <h2 className='text-primary'>
        {current ? 'Update Contact' : 'Add Contact'}
      </h2>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input
            type='text'
            name='name'
            value={name}
            placeholder='Name'
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            name='phone'
            value={phone}
            placeholder='Phone'
            onChange={onChange}
          />
        </Form.Field>
        <Form.Group inline>
          <label>Contact Type</label>
          <Form.Field
            label='Personal'
            control='input'
            type='radio'
            name='type'
            checked={type === 'personal'}
            value='personal'
            onChange={onChange}
          />
          <Form.Field
            label='Professional'
            control='input'
            type='radio'
            name='type'
            checked={type === 'professional'}
            value='professional'
            onChange={onChange}
          />
        </Form.Group>
        <Form.Button
          content={current ? 'Update Contact' : 'Add Contact'}
          fluid
          color='blue'
        />
        {current && (
          <div>
            <Button color='brown' fluid onClick={clearAll}>
              Clear
            </Button>
          </div>
        )}
      </Form>
    </>
  );
};

export default ContactForm;
