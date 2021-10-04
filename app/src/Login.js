import React, { useState } from 'react';
import LoginForm from './components/LoginForm.js';
import { useHistory } from 'react-router-dom';
import useUser from './hooks/useUser';

export default function Login() {
  const history = useHistory();
  const { login } = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      login(username, password);
      setUsername('');
      setPassword('');

      history.push('/notes');
    } catch (e) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (user) {
    return <p>User is logged</p>;
  }

  return (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  );
}
