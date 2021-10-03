import React from 'react';

const LoginForm = ({
  handleSubmit,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  return (
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
  );
};

export default LoginForm;
