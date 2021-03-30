import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// components
import NavBar from "./components/layout/NavBar";
import Home from "./components/home/Home";
import Register from "./components/auth/Register";
import BookSearch from "./components/search_books/BookIndex";
import Profile from "./components/user/Profile";
import UsersBooks from "./components/user/UsersBooks";
import Settings from "./components/settings/Settings";
// css
import "./static/css/home/home.css";
import "./static/css/basic.css";
import "./static/css/search_books/searchBooks.css";
import "./static/css/user/profile.css";
import "./static/css/layout/navigation.css";
// Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <section className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/users-books' component={UsersBooks} />
              <Route exact path='/book-search' component={BookSearch} />
              <Route exact path='/settings' component={Settings} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
