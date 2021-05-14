import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// components
import NavBar from "./components/layout/NavBar";
import Home from "./components/home/Home";
import Register from "./components/auth/Register";
import Alert from './components/layout/Alert';
import Login from "./components/auth/Login";
import PasswordReset from "./components/auth/PasswordReset";
import NewPassword from "./components/auth/NewPassword";
import BookSearch from "./components/search_books/BookIndex";
import AddBookForm from "./components/search_books/AddBookForm";
import Profile from "./components/user/Profile";
import AdminPage from "./components/admin/AdminPage";
import AddReview from "./components/user/books/AddReview";
import ViewAll from "./components/user/books/ViewAll";
import BookData from "./components/user/books/BookData";
import EditBookData from "./components/user/books/EditBookData";
import AddNote from "./components/user/notes/AddNote";
import EditNote from "./components/user/notes/EditNote";
import AllNotes from "./components/user/notes/AllNotes";
import Settings from "./components/settings/Settings";
import PrivateRoute from './components/routing/PrivateRoute';
// css
import "./static/css/home/home.css";
import "./static/css/auth/auth.css";
import "./static/css/search_books/searchBooks.css";
import "./static/css/user/profile.css";
import "./static/css/user/bookData.css";
import "./static/css/user/viewAll.css";
import "./static/css/layout/navigation.css";
import "./static/css/layout/alert.css";
import "./static/css/basic.css";
// Redux
import { Provider } from "react-redux";
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from "./store";
// Check if user is authenticated
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

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
              <Route exact path='/password-reset' component={PasswordReset} />
              <Route exact path='/new-password/:token' component={NewPassword} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <PrivateRoute exact path='/admin' component={AdminPage} />
              <PrivateRoute exact path='/add-review' component={AddReview} />
              <PrivateRoute exact path='/all-notes' component={AllNotes} />
              <PrivateRoute exact path='/view-all/:paramCategory' component={ViewAll} />
              <PrivateRoute exact path='/book-data' component={BookData} />
              <PrivateRoute exact path='/edit-book-data' component={EditBookData} />
              <PrivateRoute exact path='/add-note' component={AddNote} />
              <PrivateRoute exact path='/edit-note' component={EditNote} />
              <PrivateRoute exact path='/book-search' component={BookSearch} />
              <PrivateRoute exact path='/add-book' component={AddBookForm} />
              <PrivateRoute exact path='/settings' component={Settings} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
