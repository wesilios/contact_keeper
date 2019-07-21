import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { Form } from 'semantic-ui-react';

const Register = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirm: ''
  });

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
