import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItems from './ContactItems';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;
  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  } else {
    return (
      <Fragment>
        {contacts !== null && !loading ? (
          <TransitionGroup>
            {filtered !== null
              ? filtered.map((contact, key) => (
                  <CSSTransition
                    key={contact._id}
                    classNames='item'
                    timeout={1000}
                  >
                    <ContactItems contact={contact} />
                  </CSSTransition>
                ))
              : contacts.map((contact, key) => (
                  <CSSTransition
                    key={contact._id}
                    classNames='item'
                    timeout={500}
                  >
                    <ContactItems contact={contact} />
                  </CSSTransition>
                ))}
          </TransitionGroup>
        ) : (
          <Spinner />
        )}
      </Fragment>
    );
  }
};

export default Contacts;
