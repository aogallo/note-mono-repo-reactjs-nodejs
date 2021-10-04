import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

export default function LoginForm({ handleSubmit, ...props }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group id="username">
        <Form.Control
          type="text"
          value={props.username}
          name="Username"
          placeholder="Username"
          onChange={props.handleUsernameChange}
        />
      </Form.Group>
      <Form.Group id="password">
        <Form.Control
          type="password"
          value={props.password}
          name="Password"
          placeholder="Password"
          onChange={props.handlePasswordChange}
        />
      </Form.Group>
      <Button id="form-login-button">Login</Button>
    </Form>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string,
};
