import React, { Fragment, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

const AddNote = ({
  profile: {
    profile: { books },
    book: { id },
  },
}) => {
var book = books.filter((book) => (book._id == id ? book : null))[0];

  const [formSubmited, setFormSubmited] = useState(false);

  const onSubmit = async (e) => {
    // e.preventDefault();
    // var startDate = document.getElementsByName("startDate")[0].value;
    // var finishedDate = document.getElementsByName("finishedDate")[0].value;
    // var currentPage = document.getElementsByName("currentPage")[0].value;
    // var rating = document.getElementsByName("rating")[0].value;
    // addBook({
    //   startDate,
    //   finishedDate,
    //   currentPage,
    //   finished,
    //   title,
    //   img,
    //   bookId,
    //   rating,
    //   totalPages,
    // });
    // setFormSubmited(true);
  };

  const pageHandler = (e) => {
    var noteStyle = e.target.value;
    var pageInput = document.getElementById("pageNumberInput");
    noteStyle == "page"
      ? pageInput.classList.remove("hidden")
      : pageInput.classList.add("hidden");
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
                Add your note below.
              </p>
              <hr />
              <form className='form mt-2' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                  <div>
                    <select class='input-style'>
                      <option value='note'>Note</option>
                      <option value='quote'>Quote</option>
                      <option value='information'>Information</option>
                      <option value='evaluation'>Evaluation</option>
                      <option value='other'>Other</option>
                    </select>
                  </div>
                  <div>
                    <select
                      class='input-style'
                      id='noteSelect'
                      onChange={(e) => pageHandler(e)}
                    >
                      <option value='page'>Page</option>
                      <option value='book'>Book</option>
                    </select>
                  </div>
                  <div>
                    <input
                      id='pageNumberInput'
                      type='number'
                      placeholder='Page Number'
                      name='currentPage'
                    />
                  </div>
                  <hr />
                  <div class='justify-content-center'>
                    <textarea
                      class='input-style note-textarea'
                      placeholder='Enter your note here...'
                    ></textarea>
                  </div>
                </div>
                <div className='justify-content-center mt-2' id='doneButton'>
                  <button type='submit' className='btn-main w-100'>
                    Add Note
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

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(AddNote);
