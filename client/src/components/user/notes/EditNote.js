import React, { Fragment, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {updateNote, deleteNote} from '../../../actions/note';
import PropTypes from 'prop-types';
import profile from "../../../reducers/profile";

const EditNote = ({
  profile: {
    profile: { books },
    book: { id },
    noteId
  },
  updateNote,
  deleteNote
}) => {
var book = books.filter((book) => (book._id == id ? book : null))[0];
var note = book.notes.filter((note) => (note._id == noteId ? note : null))[0];

  const [formSubmited, setFormSubmited] = useState(false);

  useEffect(() => {
    const pageNumber = document.getElementsByName('pageNumber')[0];

    pageNumber.value = note.pageNumber
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    var noteInfo = document.getElementsByName("noteInfo")[0].value;
    var noteType = document.getElementsByName("noteType")[0].value;
    var pageNumber = document.getElementsByName("pageNumber")[0].value;
    var note = document.getElementsByName("note")[0].value;

    const res = await updateNote({
      noteInfo,
      noteType,
      pageNumber,
      note,
      noteId,
      bookId: id,
    });
    if (res) {
      setFormSubmited(true);
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
                Edit your note below.
              </p>
              <hr />
              <form className='form mt-2' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                  <div>
                    <select class='input-style' name="noteInfo">
                      <option value='note'>Note</option>
                      <option value='quote'>Quote</option>
                      <option value='information'>Information</option>
                      <option value='evaluation'>Evaluation</option>
                      <option value='other'>Other</option>
                    </select>
                  </div>
                  <div>
                  {note.noteType == "page" ?(
                    <select
                    class='input-style'
                    name='noteType'
                    onChange={(e) => pageHandler(e)}
                    >
                    <option value='page'>Page</option>
                    <option value='book'>Book</option>
                    </select>
                    ):(
                      <select
                      class='input-style'
                      name='noteType'
                      onChange={(e) => pageHandler(e)}
                    >
                      <option value='book'>Book</option>
                      <option value='page'>Page</option>
                    </select>
                    )}
                   
                  </div>
                  <div>
                  {note.pageNumber && (
                      <input
                      name='pageNumber'
                      type='number'
                      placeholder='Page Number'
                    />
                  )}
                 
                  </div>
                  <hr />
                  <div class='justify-content-center'>
                    <textarea
                    name="note"
                      class='input-style note-textarea'
                      placeholder='Enter your note here...'
                    >{note.note}</textarea>
                  </div>
                </div>
                <div className='justify-content-center mt-2' id='doneButton'>
                  <button type='submit' className='btn-main w-100' >
                    Update
                  </button>
                </div>
                <div className='justify-content-center mt-2' id='doneButton'>
                  <button className='btn-danger w-100' onClick={() => deleteNote({noteId,bookId:id})}>
                    Delete
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

EditNote.propTypes = {
  updateNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {updateNote, deleteNote})(EditNote);
