import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { editNote } from "../../../actions/note";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const Note = ({note,editNote}) => {

  var pathName = window.location.pathname

  return (
    <div class='note-container'>
      {pathName !== "/all-notes" && (
              <Link
              to='edit-note'
              class='note-edit-button'
              onClick={() => editNote({ noteId: note._id })}
            >
              <img src='https://img.icons8.com/fluent/28/000000/edit.png' />
            </Link>
      )}
      <h3>{note.title}</h3>
      <hr />
      <small class='justify-content-between mb-05'>
        <b>Note Type:</b>
        {note.noteInfo}
      </small>

      {note.noteType == "page" ? (
        <small class='justify-content-between'>
          <b>Page Number:</b>
          {note.pageNumber}
        </small>
      ) : (
        <small class='justify-content-between '>
          <b>About The Book</b>
        </small>
      )}
      <p class='note-wrapper'>{note.note}</p>
      <p class='note-date text-secondary'>
        <Moment format='DD MMM YYYY'>{note.date}</Moment>
      </p>
    </div>
  );
};

Note.propTypes = {
  editNote: PropTypes.func.isRequired,
};

export default connect(null, {editNote})(Note)