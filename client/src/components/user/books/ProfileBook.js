import React, { Fragment } from "react";
import Moment from "react-moment";
import {Link} from 'react-router-dom';
import { addBookId } from "../../../actions/profile";
import {connect} from 'react-redux';
import PropTypes from "prop-types";


const ProfileBook = ({book, addBookId}) => {

    const bookIdHandler = (b) => {
        addBookId({ id: b._id });
      };

  return (
      <Fragment>
          {book.readingStatus == 'read' ? (
               <Link
               to='book-data'
               class='profile-book-container'
               onClick={() => bookIdHandler(book)}
             >
               <img src={book.img} />
               <div class='profile-book-info-container'>
                 <p class='justify-content-between'>
                   <b>Notes:</b> {book.notes.length}
                 </p>
                 <hr />
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
                   <span>
                     <Moment
                       from={book.startDate}
                       to={book.finishedDate}
                       format='D'
                     ></Moment>{" "}
                     Days
                   </span>
                 </p>
                 <p class='justify-content-between'>
                   <b>Your Rating:</b> {book.rating} / 5
                 </p>
                 <div class='book-loading-container'>
                <div
                  class='book-loading-bar'
                  style={{
                    width: '100%',
                  }}
                ></div>
              </div>
               </div>
             </Link>
          ) : book.readingStatus == 'reading' ? (
            <Link
            to='book-data'
            class='profile-book-container'
            onClick={() => bookIdHandler(book)}
          >
            <img src={book.img} />
            <div class='profile-book-info-container'>
              <p class='justify-content-between'>
                <b>Notes:</b> {book.notes.length}
              </p>
              <hr />
              <p class='justify-content-between'>
                <b>Started:</b>{" "}
                <Moment format='DD MMM YYYY'>{book.startDate}</Moment>
              </p>
              <p class='justify-content-between'>
                <b>Total Pages:</b> {book.totalPages}
              </p>
              <p class='justify-content-between'>
                <b>Current Page:</b> {book.currentPage}
              </p>
              <div class='book-loading-container'>
                <div
                  class='book-loading-bar'
                  style={{
                    width: `${
                      100 / (book.totalPages / book.currentPage)
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </Link>
          ): (
            <Link
            to='book-data'
            class='profile-book-container'
            onClick={() => bookIdHandler(book)}
          >
            <img src={book.img} />
            <div class='profile-book-info-container'>
              <p class='justify-content-between'>
                <p>uncompleted</p>
                <b>Notes:</b> {book.notes.length}
              </p>
              <hr />
              <p class='justify-content-between'>
                <b>Started:</b>{" "}
                <Moment format='DD MMM YYYY'>{book.startDate}</Moment>
              </p>
              <p class='justify-content-between'>
                <b>Total Pages:</b> {book.totalPages}
              </p>
              <p class='justify-content-between'>
                <b>Current Page:</b> {book.currentPage}
              </p>
              <div class='book-loading-container'>
                <div
                  class='book-loading-bar progress-bar-danger'
                  style={{
                    width: `${
                      100 / (book.totalPages / book.currentPage)
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </Link>
          )}
      </Fragment>
  );
};

ProfileBook.propTypes = {
    addBookId: PropTypes.func.isRequired,
  };

export default connect(null, {addBookId})(ProfileBook);
