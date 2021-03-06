import { useState, useEffect } from 'react';
import noteService from '../services/notes';
import loginService from '../services/login';

const useUser = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('user');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const login = async (username, password) => {
    console.log(`username userUser`, username);
    console.log(`password userUser`, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      window.localStorage.removeItem('user');
      window.localStorage.setItem('user', JSON.stringify(user));
      noteService.setToken(user.token);
    } catch (e) {
      setErrorMessage('wrong credetianls');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logout = () => {
    setUser(null);
    noteService.setToken('');
    window.localStorage.removeItem('user');
  };

  return {
    user,
    login,
    logout,
  };
};

export default useUser;
