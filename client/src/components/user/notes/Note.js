import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { editNote } from "../../../actions/note";

export const Note = ({note}) => {
  return (
    <div class='note-container'>
      <Link
        to='edit-note'
        class='note-edit-button'
        onClick={() => editNote({ noteId: note._id })}
      >
        <img src='https://img.icons8.com/fluent/28/000000/edit.png' />
      </Link>
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

export default Note