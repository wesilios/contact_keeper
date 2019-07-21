import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  UPDATE_CONTACT
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Harry White',
        email: 'harrywhite@example.com',
        phone: '333-333-333',
        type: 'professional'
      },
      {
        id: 2,
        name: 'Daniel Tam',
        email: 'danieltam@example.com',
        phone: '555-555-555',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Channel Egoiste',
        email: 'harrywhite@example.com',
        phone: '222-111-222',
        type: 'professional'
      }
    ],
    current: null
  };
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    });
  };
  // Delete contact
  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  };
  // Set current contact
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };
  // Clear current contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };
  // Update contact
  const updateContact = contact => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    });
  };
  // Filter contacts
  const filterContact = () => {
    dispatch({
      type: FILTER_CONTACT,
      payload: {}
    });
  };
  // Clear filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
      payload: {}
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
