import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { Form } from 'semantic-ui-react';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirm: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User already existed') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { name, email, password, password_confirm } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields!', 'danger');
    } else if (password !== password_confirm) {
      setAlert("Passwords don't match", 'danger');
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <Form onSubmit={onSubmit}>
        <Form.Input
          label='Name'
          type='text'
          value={name}
          onChange={onChange}
          name='name'
        />
        <Form.Input
          label='Email'
          type='email'
          value={email}
          onChange={onChange}
          name='email'
        />
        <Form.Input
          label='Password'
          type='password'
          value={password}
          onChange={onChange}
          name='password'
        />
        <Form.Input
          label='Password confirm'
          type='password'
          value={password_confirm}
          onChange={onChange}
          name='password_confirm'
        />
        <Form.Button fluid color='blue' content='Submit' />
      </Form>
    </div>
  );
};

export default Register;
