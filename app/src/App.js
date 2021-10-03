import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Notes from './Notes';
import noteService from './services/notes';
import NoteDetails from './components/NoteDetails';
import Login from './Login';
const Home = () => <h1>Home Page</h1>;

const Users = () => <h1>Users</h1>;

const App = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const inlineStyles = {
    padding: 5,
  };

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('user');
    console.log(`loggedUserJson`, loggedUserJson);
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  return (
    <BrowserRouter>
      <header>
        <Link to="/" style={inlineStyles}>
          Home
        </Link>
        <Link to="/users" style={inlineStyles}>
          Users
        </Link>
        <Link to="/notes" style={inlineStyles}>
          Notes
        </Link>
        {user ? (
          <em>Logged as {user.name}</em>
        ) : (
          <Link to="/login" style={inlineStyles}>
            Login
          </Link>
        )}
      </header>
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/notes/:id">
          <NoteDetails notes={notes} />
        </Route>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route
          path="/login"
          render={() => (user ? <Redirect to="/" /> : <Login />)}
        >
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
