import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItems from './ContactItems';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  } else {
    return (
      <Fragment>
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact, key) => (
                <CSSTransition
                  key={contact.id}
                  classNames='item'
                  timeout={1000}
                >
                  <ContactItems contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact, key) => (
                <CSSTransition key={contact.id} classNames='item' timeout={500}>
                  <ContactItems contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      </Fragment>
    );
  }
};

export default Contacts;
