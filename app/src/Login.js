import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import { useHistory } from 'react-router-dom';
import useUser from './hooks/useUser';

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const { user, login } = useUser();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      login();
      setUsername('');
      setPassword('');
      history.push('/notes');
    } catch (e) {
      setErrorMessage('wrong credetianls');
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
      handleSubmit={handleLogin}
      username={username}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      password={password}
      handlePasswordChange={({ target }) => setPassword(target.value)}
    />
  );
};

export default Login;
