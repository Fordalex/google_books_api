import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { removeBook, updateBook } from "../../../actions/books";

const AddReview = ({
  profile: {
    profile: { books },
    book: { id },
  },
  removeBook,
  updateBook,
}) => {
  const [formSubmited, setFormSubmited] = useState(false);
  var book = books.filter((book) => (book._id == id ? book : null))[0];

  const [bookRemoved, setBookRemoved] = useState(false);

  useEffect(() => {}, []);

  const removeBookHandler = async () => {
    var res = await removeBook({ id, title: book.title });
    if (res) {
      setBookRemoved(true);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    var review = document.getElementsByClassName("review")[0].value;
    var rating = document.getElementsByClassName("rating")[0].value;

    // var res = await addReview({
    //     review,
    //     rating
    // });
    // if (res) {
    //   setFormSubmited(true)
    // }
  };

  return (
    <Fragment>
      {formSubmited ? (
        <Redirect to='profile' />
      ) : (
        <Fragment>
          <div class='form-page-container'>
            <div class='form-wrapper'>
              <Link to='book-data'>
                <img
                  class='info-back-button'
                  src='https://img.icons8.com/ios/35/000000/circled-left-2.png'
                />
              </Link>
              <div>
                <h3 class='text-center p-1 m-0'>{book.title}</h3>
                <p class='text-secondary text-center mt-0'>
                  Leave your review and rating below.
                </p>
                <hr />
                <form className='form mt-2' onSubmit={(e) => onSubmit(e)}>
                  <div className='form-group'>
                    <p>Review</p>
                    <textarea type='date' name='review' class='input-style mb-05' placeholder='Your review...'></textarea>
                    <p>Rating</p>
                    <input type='number' max='5' min='0' name='review' class='input-style'/>
                  </div>
                  <hr/>
                  <div className='justify-content-center mt-2' id='doneButton'>
                    <button type='submit' className='btn btn-main w-100'>
                      Update
                    </button>
                  </div>
                  <div className='justify-content-center mt-2' id='doneButton'>
                    <button
                      className='btn btn-danger w-100'
                      onClick={() => removeBookHandler()}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

AddReview.propTypes = {
  profile: PropTypes.object.isRequired,
  removeBook: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { removeBook, updateBook })(AddReview);
