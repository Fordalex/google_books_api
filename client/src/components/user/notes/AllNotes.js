import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBookId } from "../../../actions/profile";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../../actions/profile";
import Note from './Note';

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

  var booksWithNotes = books.filter((book) => {
    return book.notes.length > 0 ? book : null
  });

  const bookIdHandler = (b) => {
    addBookId({ id: b._id });
  };

  return (
    <Fragment>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div class="p-2">
          {booksWithNotes.map((book) => {
            return <div
            class="text-dark"
            to='book-data'
            onClick={() => bookIdHandler(book)}
          >
              <h2 >{book.title}</h2>
              {book.notes.map((note) => {
                return <Note note={note} />
              })}
              <hr/>
            </div>
          })}
        </div>
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

export default connect(mapStateToProps, {getCurrentProfile, addBookId})(AllNotes);
