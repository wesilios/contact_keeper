import React, { useState, useContext, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({ email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <Form onSubmit={onSubmit}>
        <Form.Input
          label='Email'
          type='email'
          value={email}
          onChange={onChange}
          name='email'
          required
        />
        <Form.Input
          label='Password'
          type='password'
          value={password}
          onChange={onChange}
          name='password'
          required
        />
        <Form.Button fluid color='blue' content='Submit' />
      </Form>
    </div>
  );
};

export default Login;
