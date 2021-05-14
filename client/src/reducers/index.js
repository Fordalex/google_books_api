import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './profile';
import books from './books';
import admin from './admin';

export default combineReducers({
    auth,
    alert,
    profile,
    books,
    admin,
});