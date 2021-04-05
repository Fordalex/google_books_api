import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { removeBook, updateBook } from "../../../actions/books";
import Moment from "react-moment";

const EditBookData = ({
  profile: {
    profile: { books },
    book: { id },
  },
  removeBook,
}) => {
  const [formSubmited, setFormSubmited] = useState(false);
  var book = books.filter((book) => (book._id == id ? book : null))[0];

  const [bookRemoved, setBookRemoved] = useState(false);

  useEffect(() => {
    const startDateInput = document.getElementsByName("startDate")[0];
    const finishedDateInput = document.getElementsByName("finishedDate")[0];
    const currentPageInput = document.getElementsByName("currentPage")[0];
    const ratingInput = document.getElementsByName("rating")[0];

    startDateInput.value = book.startDate.slice(0, 10);
    finishedDateInput.value = book.finishedDate
      ? book.finishedDate.slice(0, 10)
      : "";
    currentPageInput.value = book.currentPage ? book.currentPage : "";
    ratingInput.value = book.rating;
  }, []);

  const removeBookHandler = async () => {
    var res = await removeBook({ id, title: book.title });
    if (res) {
      setBookRemoved(true);
    }
  };

  const readingStatus = (e = book.readingStatus) => {
    var finishedInput = document.getElementById("finishedInput");
    var pageInput = document.getElementById("pageInput");
    var reasonInput = document.getElementById("reasonInput");

    if (e.target) {
      var val = e.target.value;
    } else {
      var val = e;
    }
    
    console.log(val);
    if (val == "read") {
      pageInput.classList.add("hidden");
      finishedInput.classList.remove("hidden");
      reasonInput.classList.add("hidden");
    } else if (val == "reading") {
      finishedInput.classList.add("hidden");
      pageInput.classList.remove("hidden");
      reasonInput.classList.add("hidden");
    } else if (val == "uncompleted") {
      finishedInput.classList.add("hidden");
      pageInput.classList.remove("hidden");
      reasonInput.classList.remove("hidden");
    }
  };

  const onSubmit = async () => {
    console.log("working");
    // updateBook({
    //   uncompletedReason,
    //   readingStatus,
    //   startDate,
    //   finishedDate,
    //   currentPage,
    //   finished,
    //   title,
    //   img,
    //   bookId,
    //   rating,
    //   totalPages,
    // })
  };

  return (
    <Fragment>
      {formSubmited ? (
        <Redirect to='profile' />
      ) : (
        <Fragment>
          <div>
            <Link to='book-data'>
              <img
                class='info-back-button'
                src='https://img.icons8.com/ios/35/000000/circled-left-2.png'
              />
            </Link>
            <div class='p-2'>
              <h3 class='text-center p-1 m-0'>{book.title}</h3>
              <p class='text-secondary text-center mt-0'>
                Please edit the information below.
              </p>
              <hr />
              <form className='form mt-2' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                  <p>Start Date</p>
                  <input type='date' name='startDate' required />
                  <hr />
                  <p>Reading Status</p>
                  <select
                    class='input-style'
                    name='readingStatus'
                    onChange={readingStatus()}
                  >
                    <option value='reading'>Reading</option>
                    <option value='read'>Read</option>
                    <option value='uncompleted'>Uncompleted</option>
                  </select>
                  <hr />
                  <div class='hidden' id='finishedInput'>
                    <p>Finished Date</p>
                    <input type='date' name='finishedDate' />
                    <input
                      min='0'
                      max='5'
                      type='number'
                      name='rating'
                      placeholder='Rating'
                    />
                  </div>
                  <div id='pageInput'>
                    <input
                      type='number'
                      placeholder='Current Page'
                      name='currentPage'
                    />
                  </div>
                  <div class='hidden' id='reasonInput'>
                    <input
                      type='text'
                      placeholder='Reason...'
                      name='uncompletedReason'
                    />
                  </div>
                </div>
                <div
                  className='justify-content-center mt-2 hidden'
                  id='doneButton'
                >
                  <button type='submit' className='btn-main w-100'>
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

EditBookData.propTypes = {
  profile: PropTypes.object.isRequired,
  removeBook: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { removeBook, updateBook })(
  EditBookData
);
