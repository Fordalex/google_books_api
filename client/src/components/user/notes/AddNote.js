import React, { Fragment, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { saveNote } from "../../../actions/note";
import PropTypes from "prop-types";
import { setAlert } from "../../../actions/alert";

const AddNote = ({
  profile: {
    profile: { books },
    book: { id },
  },
  saveNote,
  setAlert
}) => {
  var book = books.filter((book) => (book._id == id ? book : null))[0];

  const [formSubmited, setFormSubmited] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    var noteInfo = document.getElementsByName("noteInfo")[0].value;
    var noteType = document.getElementsByName("noteType")[0].value;
    var pageNumber = document.getElementsByName("pageNumber")[0].value;
    var note = document.getElementsByName("note")[0].value;
    var title = document.getElementsByName("title")[0].value;

    // Form validation
    if (pageNumber || noteType == 'book' && title && note) {
      const res = await saveNote({
        title,
        noteInfo,
        noteType,
        pageNumber,
        note,
        bookId: id,
      });
      if (res) {
        setFormSubmited(true);
      } 
    } else if (!title) {
      setAlert('Please enter a title for your.', 'danger')
    } else if (!pageNumber && noteType !== 'book') {
      setAlert('Please enter a page number or change from page to book.', 'danger')
    } else if (!note) {
      setAlert('Please enter a note.', 'danger')
    } else {
      setAlert('Make sure all fields are filled in.', 'danger')
    }
    
    
  };

  const pageHandler = (e) => {
    var noteStyle = e.target.value;
    var pageInput = document.getElementsByName("pageNumber")[0];
    noteStyle == "page"
      ? pageInput.classList.remove("hidden")
      : pageInput.classList.add("hidden");
  };

  return (
    <Fragment>
      {formSubmited ? (
        <Redirect to='book-data' />
      ) : (
        <Fragment>
          <div class="form-page-container">
            <div class="form-wrapper">
              <Link to='book-data'>
                <img
                  class='info-back-button'
                  src='https://img.icons8.com/ios/35/000000/circled-left-2.png'
                />
              </Link>

              <div>
                <h3 class='text-center p-1 m-0'>{book.title}</h3>
                <p class='text-secondary text-center mt-0 mb-3'>
                  Add your note below.
                </p>
                <hr />
                <div class='justify-content-center py-1'>
                  <input
                    name='title'
                    class='input-style'
                    type='text'
                    placeholder='Note title'
                  />
                </div>
                <hr />
                <form className='form mt-2' onSubmit={(e) => onSubmit(e)}>
                  <div className='form-group'>
                    <div>
                      <select class='input-style' name='noteInfo'>
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
                        name='noteType'
                        onChange={(e) => pageHandler(e)}
                      >
                        <option value='page'>Page</option>
                        <option value='book'>Book</option>
                      </select>
                    </div>
                    <div class='mb-1 pb-1'>
                      <input
                        name='pageNumber'
                        type='number'
                        placeholder='Page Number'
                      />
                    </div>
                    <hr />
                    <div class='justify-content-center'>
                      <textarea
                        name='note'
                        class='input-style note-textarea mt-1'
                        placeholder='Enter your note here...'
                      ></textarea>
                    </div>
                  </div>
                  <div className='justify-content-center mt-2' id='doneButton'>
                    <button type='submit' className='btn btn-main w-100'>
                      Add Note
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

AddNote.propTypes = {
  saveNote: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { saveNote, setAlert })(AddNote);
