import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBookId } from "../../../actions/profile";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../../actions/profile";
import Note from "./Note";

const AllNotes = ({
  profile: {
    profile: { user, books },
    loading,
  },
  addBookId,
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [filter, setFilter] = useState('all');

  var filteredNotes = books.filter((book) => {
    return book.notes.length > 0 ? book : null;
  });

  console.log(filteredNotes);

  const bookIdHandler = (b) => {
    addBookId({ id: b._id });
  };

  const changeFilterHandler = (e) => {
    setFilter(e.target.value);
  }

  return (
    <Fragment>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Fragment>
          <div class='p-1 form-group'>
            <p>Note Type</p>
            <select class='input-style' onChange={(e) => changeFilterHandler(e)}>
              <option value='all'>All</option>
              <option value='note'>Note</option>
              <option value='quote'>Quote</option>
              <option value='information'>Information</option>
              <option value='evaluation'>Evaluation</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <hr class="mb-0"/>
          <div class='p-2'>
            {filteredNotes.length < 1 && (
              <p class='text-secondary'>You haven't added any notes yet!</p>
            )}
            {filteredNotes.map((book) => {
              return (
                <div
                  class='text-dark'
                  to='book-data'
                  onClick={() => bookIdHandler(book)}
                >
                  <h2 class='justify-content-between align-items-center'>
                    {book.title} <img src={book.img} class='mini-book' />
                  </h2>
                  {book.notes.map((note) => {
                    if (note.noteInfo == filter || filter == 'all') {
                      return <Note note={note} />;
                    }
                  })}
                  <hr />
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

AllNotes.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  addBookId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, addBookId })(
  AllNotes
);
