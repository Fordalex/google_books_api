import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// components
import NavBar from "./components/layout/NavBar";
import BookSearch from "./components/search_books/BookIndex";
// css
import './static/css/basic.css'
import './static/css/search_books/searchBooks.css'
import './static/css/layout/navigation.css'

function App() {
  return (
    <Router>
      <Fragment>
        <NavBar />
        <section className='container'>
          <Switch>
            <Route exact path='/book-search' component={BookSearch} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
