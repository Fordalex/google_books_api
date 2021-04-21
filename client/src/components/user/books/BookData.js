import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { editNote } from "../../../actions/note";
import Note from '../notes/Note';

const BookData = ({
  profile: {
    profile: { books },
    book: { id },
  },
  editNote
}) => {
  var book = books.filter((book) => (book._id == id ? book : null))[0];

  useEffect(() => {
    try {
      const avgPagesPerDay = document.getElementById("avgPagesPerDay");
      const timeTaken = document.getElementById("timeTaken").innerHTML;

      avgPagesPerDay.innerHTML = Math.round(book.totalPages / timeTaken, 2);
    } catch {
      var avgPagesPerDay = 0;
    }
  }, []);

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
      <div class='book-loading-container'>
        {book.finished ? (
          <div class='book-loading-bar' style={{ width: `100%` }}></div>
        ) : (
          <div
            class='book-loading-bar'
            style={{ width: `${100 / (book.totalPages / book.currentPage)}%` }}
          ></div>
        )}
      </div>
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
        <div class='book-data-info-container'>
          <p class='justify-content-between'>
            <b>Started:</b>
            <Moment format='DD MMM YYYY'>{book.startDate}</Moment>
          </p>
          {book.readingStatus !== 'reading' && (
              <p class='justify-content-between'>
              <b>Finished:</b>
              {book.finishedDate ? (
                <Moment format='DD MMM YYYY'>{book.finishedDate}</Moment>
              ) : (
                <small class='text-secondary'>
                  Press edit when you've finished
                </small>
              )}
            </p>
          )}
          <p class='justify-content-between'>
            <b>Total Pages:</b> {book.totalPages}
          </p>
          {book.currentPage && (
            <p class='justify-content-between'>
              <b>Current Page:</b> {book.currentPage}
            </p>
          )}
          <p class='justify-content-between'>
            <b>Time Taken:</b>
            <span>
              <Moment
                id='timeTaken'
                duration={book.startDate}
                date={book.finishedDate}
                format='D'
              ></Moment>{" "}
              Days
            </span>
          </p>
          {book.finished && (
            <p class='justify-content-between'>
              <b>Avg Pages Per Day:</b>
              <span id='avgPagesPerDay'></span>
            </p>
          )}
          <p class='justify-content-between'>
            <b>Your Rating:</b>
            <span>
              {book.rating ? (
                book.rating
              ) : (
                <small class='text-secondary'>Press edit to add rating </small>
              )}
              / 5
            </span>
          </p>
          {book.categories && (
            <p class='justify-content-between'>
              <b>Categories</b>
              {book.categories.map((cat) => (
                <span>{cat}</span>
              ))}
            </p>
          )}
        </div>
        <hr />
        <div class='justify-content-center'>
          <Link to='add-note' class='btn-main w-100 text-center'>
            Add Note
          </Link>
          <Link
            to='edit-book-data'
            class='btn-secondary w-100 text-center ml-1'
          >
            Edit
          </Link>
        </div>
        <hr />
        {book.notes.length < 1 ? (
          <p class='text-secondary'>You haven't added any notes yet.</p>
        ) : (
          <Fragment>
            <h2>Notes</h2>
            {book.notes.map((note) => (
              <Note note={note}/>
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

BookData.propTypes = {
  profile: PropTypes.object.isRequired,
  editNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { editNote })(BookData);
