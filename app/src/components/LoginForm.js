import React from 'react';
import useField from '../hooks/useField';

const LoginForm = ({
  handleSubmit,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  const username = useField({ type: 'text' });
  const password = useField({ type: 'password' });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input {...username} name="username" placeholder="Username" />
      </div>
      <div>
        <input {...password} name="password" placeholder="Password" />
      </div>
      <button id="form-login-button">login</button>
    </form>
  );
};

export default LoginForm;
