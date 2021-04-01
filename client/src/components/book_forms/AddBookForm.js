import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBook } from "../../actions/books";
import { Redirect } from "react-router-dom";

const AddBookForm = ({ books: { books, bookIndex }, addBook }) => {

  const [formSubmited, setFormSubmited] = useState(false)

  //   Check if book has title
  try {
    var title = books.items[bookIndex].volumeInfo.title;
  } catch {
    return null;
  }
  //  Check if book has id
  try {
    var bookId = books.items[bookIndex].id;
  } catch {
    return null;
  }
  //  Check if book has id
  // Check if book has image
  try {
    var img = books.items[bookIndex].volumeInfo.imageLinks.thumbnail;
  } catch {
    return null;
  }

  var finished = false;

  const onSubmit = async (e) => {
    e.preventDefault();
    var startDate = document.getElementsByName("startDate")[0].value;
    var finishedDate = document.getElementsByName("finishedDate")[0].value;
    var currentPage = document.getElementsByName("currentPage")[0].value;

    addBook({
      startDate,
      finishedDate,
      currentPage,
      finished,
      title,
      img,
      bookId,
    });
    setFormSubmited(true);
  };

  const finsihedBook = (e) => {
    var finsiehdInput = document.getElementById("finishedInput");
    var pageInput = document.getElementById("pageInput");
    var doneButton = document.getElementById("doneButton");

    if (e.target.id == "yes") {
      pageInput.classList.add("hidden");
      finished = true;
      finsiehdInput.classList.remove("hidden");
    } else {
      finsiehdInput.classList.add("hidden");
      finished = false;
      pageInput.classList.remove("hidden");
    }
    doneButton.classList.remove("hidden");
  };

  return (
    <Fragment>
      {formSubmited ? (
        <Redirect to="profile"/>
      ): (
        <Fragment>
        <div>
        <img
          class='info-back-button'
          src='https://img.icons8.com/ios/35/000000/circled-left-2.png'
        />
        <div class='p-2'>
          <h3 class='text-center p-1 m-0'>{title}</h3>
          <p class='text-secondary text-center mt-0'>
            Please fill out the information below.
          </p>
          <hr />
          <form className='form mt-2' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <p>Start Date</p>
              <input type='date' name='startDate' required />
              <div class='justify-content-around align-items-center mb-2'>
                <p class='text-dark m-0'>Have you finished this book?</p>
                <div>
                  Yes
                  <input
                    type='radio'
                    name='reading'
                    id='yes'
                    onChange={finsihedBook}
                  />
                </div>
                <div>
                  No
                  <input
                    type='radio'
                    name='reading'
                    id='no'
                    onChange={finsihedBook}
                  />
                </div>
              </div>
              <div class='hidden' id='finishedInput'>
                <p>Finished Date</p>
                <input type='date' name='finishedDate' />
              </div>
              <div class='hidden' id='pageInput'>
                <input
                  type='number'
                  placeholder='Current Page'
                  name='currentPage'
                />
              </div>
            </div>
            <div className='justify-content-center mt-2 hidden' id='doneButton'>
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

AddBookForm.propTypes = {
  books: PropTypes.object.isRequired,
  addBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  books: state.books,
});

export default connect(mapStateToProps, { addBook })(AddBookForm);
