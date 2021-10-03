import React from 'react';
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Notes from './Notes';
import NoteDetails from './components/NoteDetails';
import Login from './Login';
import useUser from './hooks/useUser';
import useNotes from './hooks/useNotes';

const Home = () => <h1>Home Page</h1>;

const Users = () => <h1>Users</h1>;

const App = () => {
  const { notes } = useNotes();
  const { user } = useUser();
  const inlineStyles = {
    padding: 5,
  };

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
        ></Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
