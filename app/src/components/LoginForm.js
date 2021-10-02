import React from 'react';
import Togglable from './Togglable';

const NO_OP = () => {};

const LoginForm = ({
  handleSubmit,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  return (
    <Togglable buttonLabel="Show login">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id="form-login-button">login</button>
      </form>
    </Togglable>
  );
};

export default LoginForm;
