import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBook } from "../../actions/books";
import { Redirect, Link } from "react-router-dom";

const AddBookForm = ({ books: { books, bookIndex }, addBook }) => {
  const [formSubmited, setFormSubmited] = useState(false);

  //   Check if book has title
  try {
    var title = books.items[bookIndex].volumeInfo.title;
  } catch {
    var title;
  }
  //  Check if book has id
  try {
    var bookId = books.items[bookIndex].id;
  } catch {
    var bookId;
  }
  //  Check if book has id
  // Check if book has image
  try {
    var img = books.items[bookIndex].volumeInfo.imageLinks.thumbnail;
  } catch {
    var img;
  }
  // Check if book has total pages
  try {
    var totalPages = books.items[bookIndex].volumeInfo.pageCount;
  } catch {
    var totalPages;
  }
  // Check if book has total pages
  try {
    var categories = books.items[bookIndex].volumeInfo.categories
  } catch {
    var categories;
  }

  var finished = false;

  const onSubmit = async (e) => {
    e.preventDefault();
    var startDate = document.getElementsByName("startDate")[0].value;
    var finishedDate = document.getElementsByName("finishedDate")[0].value;
    var currentPage = document.getElementsByName("currentPage")[0].value;
    var rating = document.getElementsByName("rating")[0].value;
    var uncompletedReason = document.getElementsByName('uncompletedReason')[0].value;
    var readingStatus = document.getElementsByName('readingStatus')[0].value;

    addBook({
      uncompletedReason,
      readingStatus,
      startDate,
      finishedDate,
      currentPage,
      finished,
      title,
      img,
      bookId,
      rating,
      totalPages,
      categories
    });
    setFormSubmited(true);
  };

  const readingStatus = (e) => {
    var finsiehdInput = document.getElementById("finishedInput");
    var pageInput = document.getElementById("pageInput");
    var reasonInput = document.getElementById('reasonInput');
    var doneButton = document.getElementById("doneButton");
    var val = e.target.value;

    if (val == "read") {
      pageInput.classList.add("hidden");
      finished = true;
      finsiehdInput.classList.remove("hidden");
      reasonInput.classList.add('hidden');
    } else if (val == 'reading') {
      finsiehdInput.classList.add("hidden");
      finished = false;
      pageInput.classList.remove("hidden");
      reasonInput.classList.add('hidden');
    } else {
      finsiehdInput.classList.add("hidden");
      pageInput.classList.remove("hidden");
      reasonInput.classList.remove('hidden');
    }
    doneButton.classList.remove("hidden");
  };

  return (
    <Fragment>
      {formSubmited ? (
        <Redirect to='profile' />
      ) : (
        <Fragment>
          <div class="form-page-container">
          <div class="form-wrapper">
            <Link to='book-search'>
              <img
                class='info-back-button'
                src='https://img.icons8.com/ios/35/000000/circled-left-2.png'
              />
            </Link>
            <div>
              <h3 class='text-center p-1 m-0'>{title}</h3>
              <p class='text-secondary text-center mt-0'>
                Please fill out the information below.
              </p>
              <hr />
              <form className='form mt-2' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                  <p>Start Date</p>
                  <input type='date' name='startDate' required />
                  <hr />
                  <p>Reading Status</p>
                  <select class="input-style" name="readingStatus" onChange={readingStatus}>
                    <option value="reading">Reading</option>
                    <option value="read">Read</option>
                    <option value="uncompleted">Uncompleted</option>
                  </select>
                  <hr/>
                  <div class='hidden' id='finishedInput'>
                    <p>Finished Date</p>
                    <input type='date' name='finishedDate' />
                    <input min='0' max='5' type='number' name='rating' placeholder="Rating" />
                  </div>
                  <div id='pageInput'>
                    <input
                      type='number'
                      placeholder='Current Page'
                      name='currentPage'
                    />
                  </div>
                  <div class="hidden" id="reasonInput">
                    <input 
                    type="text"
                    placeholder="Reason..."
                    name="uncompletedReason"/>
                  </div>
                </div>
                <div
                  className='justify-content-center mt-2'
                  id='doneButton'
                >
                  <button type='submit' className='btn btn-main w-100'>
                    Done
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

AddBookForm.propTypes = {
  books: PropTypes.object.isRequired,
  addBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  books: state.books,
});

export default connect(mapStateToProps, { addBook })(AddBookForm);
