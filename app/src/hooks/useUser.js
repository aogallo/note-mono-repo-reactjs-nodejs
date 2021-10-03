import { useState, useEffect } from 'react';
import noteService from '../services/notes';

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('user');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  return {
    user,
    setUser,
  };
};

export default useUser;
