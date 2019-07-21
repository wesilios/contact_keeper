import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

const Login = () => {
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
        />
        <Form.Input
          label='Password'
          type='password'
          value={password}
          onChange={onChange}
          name='password'
        />
        <Form.Button fluid color='blue' content='Submit' />
      </Form>
    </div>
  );
};

export default Login;
