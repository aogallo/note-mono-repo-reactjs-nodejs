import React, { lazy, Suspense } from 'react';
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Notes from './Notes';
import { Helmet } from 'react-helmet';
import NoteDetails from './components/NoteDetails';
import Login from './Login';
import useUser from './hooks/useUser';
import useNotes from './hooks/useNotes';
import { Nav, Navbar } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Notes App</title>
      </Helmet>
      <h1>Home Page</h1>
    </>
  );
};

const Users = () => <h1>Users</h1>;

const App = () => {
  const { notes } = useNotes();
  const { user } = useUser();
  const inlineStyles = {
    padding: 5,
  };

  return (
    //todo comopnente suspense
    <Suspense fallback={<span>Loading component....</span>}>
      <div className="container">
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Toggle aria-control="responsive-navbar-nav" />

          <Navbar.Collapse>
            <Nav>
              <Nav.Link>
                <Link to="/" style={inlineStyles}>
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/users" style={inlineStyles}>
                  Users
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/notes" style={inlineStyles}>
                  Notes
                </Link>
              </Nav.Link>
              {user ? (
                <em>Logged as {user.name}</em>
              ) : (
                <Link to="/login" style={inlineStyles}>
                  Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
      </div>
    </Suspense>
  );
};

export default App;
