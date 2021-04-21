import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../../actions/profile";
import Note from './Note';

const AllNotes = ({
  profile: {
    profile: { user, books },
    loading,
  },
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  var booksWithNotes = books.filter((book) => {
    return book.notes.length > 0 ? book : null
  });
  var notes = booksWithNotes.map((book) => {
    return book.notes
  });
  var allNotes = []
  for (let i = 0; i < notes.length; i++) {
    for (let j = 0; j < notes[i].length; j++) {
      allNotes.push(notes[i][j])
    }
  }

  return (
    <Fragment>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div class="p-2">
          {allNotes.map((note) => {
            return <Note note={note} />
          })}
        </div>
      )}
    </Fragment>
  );
};

AllNotes.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {getCurrentProfile})(AllNotes);
