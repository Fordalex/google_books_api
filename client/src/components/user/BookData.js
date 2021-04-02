import React from "react";
import anime from "animejs/lib/anime.es.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

const BookData = ({
  profile: {
    profile: { books },
    book: { id },
  },
}) => {
  var book = books.filter((book) => (book._id == id ? book : null))[0];

  return (
    <div>
      <Link to='profile'>
        <img
          class='info-back-button'
          src='https://img.icons8.com/ios/35/000000/circled-left-2.png'
        />
      </Link>

      {book.img ? (
        <img class='book-info-img' src={book.img} />
      ) : (
        <p class='book-info-img'>No Image</p>
      )}
      <div class='book-all-info-container'>
        <div class='book-all-title-container'>
          <div>
            <h3>{book.title}</h3>
          </div>
          <div class='d-flex-center'>
            <img
              class='love-icon'
              src='https://img.icons8.com/material-outlined/24/000000/filled-like.png'
            />
          </div>
        </div>
        <hr />
        <div class="book-data-info-container">
        <p class='justify-content-between'>
          <b>Started:</b> <Moment format='DD MMM YYYY'>{book.startDate}</Moment>
        </p>
        <p class='justify-content-between'>
          <b>Finished:</b>{" "}
          <Moment format='DD MMM YYYY'>{book.finishedDate}</Moment>
        </p>
        <p class='justify-content-between'>
          <b>Total Pages:</b> {book.totalPages}
        </p>
        <p class='justify-content-between'>
          <b>Time Taken:</b>{" "}
          <Moment from={book.startDate} to={book.finishedDate}></Moment>
        </p>
        <p class='justify-content-between'>
          <b>PPD:</b>{" "}
        </p>
        <p class='justify-content-between'>
          <b>Your Rating:</b> {book.rating} / 5
        </p>
        </div>
        <hr/>
        <div class='justify-content-center'>
          <Link to='add-note' class='btn-main w-100 text-center'>
            Add Note
          </Link>
          <Link to='edit-book-info' class='btn-secondary w-100 text-center ml-1'>
            Edit Info
          </Link>
        </div>
        <hr />
        {book.notes.length < 1 ? (
          <p class='text-secondary'>You haven't added any notes yet.</p>
        ) : (
          <p>notes</p>
        )}
      </div>
    </div>
  );
};

BookData.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(BookData);
