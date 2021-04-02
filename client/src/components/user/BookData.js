import React from "react";
import anime from "animejs/lib/anime.es.js";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const BookData = ({ profile: {profile: {books}, book: {id}} }) => {

  var book = books.filter((book) => book._id == id ? book : null)[0]

  return (
    <div>
      <Link to="profile">
      <img class="info-back-button" src="https://img.icons8.com/ios/35/000000/circled-left-2.png"/>
      </Link>

      {book.img ? (
        <img class='book-info-img' src={book.img} />
      ) : (
        <p class='book-info-img'>No Image</p>
      )}
      <div class='book-all-info-container'>
        <div class="book-all-title-container">
          <div>
            <h3>{book.title}</h3>
          </div>
          <div class="d-flex-center">
            <img class="love-icon" src='https://img.icons8.com/material-outlined/24/000000/filled-like.png' />
          </div>
        </div>
        <p>This page working??</p>
        <hr/>
        <div class="justify-content-between align-items-center">
          <div class="justify-content-between align-items-center w-100">
            <div class="justify-content-between align-items-center">
            <img class="rating-icon m-1" src='https://img.icons8.com/color/25/000000/filled-star--v1.png' />
            <p class="rating">Rating</p>
            </div>

          </div>
        </div>
        <hr/>
          <Link class="add-book" to="add-book">Add Book</Link>
      </div>
    </div>
  );
};

BookData.propTypes = {
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(BookData);