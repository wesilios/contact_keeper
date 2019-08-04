import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import ContactContext from '../../context/contact/contactContext';

const ContactItems = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h4 className='text-primary text-left' style={{ fontSize: '1.1em' }}>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h4>
      <ul className='list'>
        {email && (
          <li>
            <Icon name='envelope' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <Icon name='phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItems.propTypes = {
  contact: PropTypes.object.isRequired
};
export default ContactItems;
