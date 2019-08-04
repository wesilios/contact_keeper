import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logOut, user } = authContext;
  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;

  const onLogOut = () => {
    logOut();
    clearContacts();
  };
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogOut} href='#!'>
          <Icon name='sign-out' /> <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Icon name='vcard' /> {title}
      </h1>
      <ul>
        <li>
          <Link to='/about'>About</Link>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired
};

Navbar.defaultProps = {
  title: 'Contact Keeper'
};

export default Navbar;
