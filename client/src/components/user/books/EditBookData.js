import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { removeBook } from "../../../actions/books";
import Moment from "react-moment";

const EditBookData = ({
  profile: {
    profile: { books },
    book: { id },
  },
  removeBook,
}) => {
  var book = books.filter((book) => (book._id == id ? book : null))[0];

  const [bookRemoved, setBookRemoved] = useState(false);

  useEffect(() => {
    const startDateInput = document.getElementById('startDate');
    const finishedDateInput = document.getElementsByName("finishedDate")[0];
    const currentPageInput = document.getElementsByName("currentPage")[0];
    const ratingInput = document.getElementsByName("rating")[0];

    startDateInput.value = book.startDate.slice(0, 10);
    finishedDateInput.value = book.finishedDate ? book.finishedDate.slice(0, 10) : "";
    currentPageInput.value = book.currentPage ? book.currentPage : "";
    ratingInput.value = book.rating;
  }, []);

  const removeBookHandler = async () => {
    var res = await removeBook({ id, title: book.title });
    if (res) {
      setBookRemoved(true);
    }
  };

  return (
    <div>
      {bookRemoved ? (
        <Redirect to='profile' />
      ) : (
        <Fragment>
          <Link to='book-data'>
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
            <div class='book-data-info-container'>
              <p class='justify-content-between'>
                <b>Started:</b> <input type='date' name='startDate' id="startDate" />
              </p>
              <p class='justify-content-between'>
                <b>Finished:</b> <input type='date' name='finishedDate' />
              </p>
              <p class='justify-content-between'>
                <b>Total Pages:</b> {book.totalPages}
              </p>
              <p class='justify-content-between'>
                <b>Current Page:</b>{" "}
                <input
                  type='number'
                  name='currentPage'
                  style={{ width: "50px" }}
                />
              </p>
              <p class='justify-content-between'>
                <b>Your Rating:</b>{" "}
                <span>
                  <input
                    type='number'
                    min='0'
                    max='5'
                    name='rating'
                    style={{ width: "50px" }}
                  />{" "}
                  / 5
                </span>
              </p>
            </div>
            <hr />
            <div class='justify-content-center'>
              <div class='btn-main w-100 text-center'>Update</div>
            </div>
            <div className='justify-content-center mt-2'>
              <button
                onClick={() => removeBookHandler()}
                className='btn-danger w-100'
              >
                Delete
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

EditBookData.propTypes = {
  profile: PropTypes.object.isRequired,
  removeBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { removeBook })(EditBookData);
