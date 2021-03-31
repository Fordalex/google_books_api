import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// components
import NavBar from "./components/layout/NavBar";
import Home from "./components/home/Home";
import Register from "./components/auth/Register";
import Alert from './components/layout/Alert';
import Login from "./components/auth/Login";
import BookSearch from "./components/search_books/BookIndex";
import Profile from "./components/user/Profile";
import UsersBooks from "./components/user/UsersBooks";
import Settings from "./components/settings/Settings";
import PrivateRoute from './components/routing/PrivateRoute';
// css
import "./static/css/home/home.css";
import "./static/css/auth/auth.css";
import "./static/css/search_books/searchBooks.css";
import "./static/css/user/profile.css";
import "./static/css/layout/navigation.css";
import "./static/css/layout/alert.css";
import "./static/css/basic.css";
// Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Alert/>
          <section className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <PrivateRoute exact path='/users-books' component={UsersBooks} />
              <PrivateRoute exact path='/book-search' component={BookSearch} />
              <PrivateRoute exact path='/settings' component={Settings} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
