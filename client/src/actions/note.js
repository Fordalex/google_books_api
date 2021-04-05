import axios from "axios";
import { setAlert } from "../actions/alert";
import {getCurrentProfile} from './profile';

export const saveNote = ({
  noteInfo,
  noteType,
  pageNumber,
  note,
  bookId,
  title
}) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const body = { noteInfo, noteType, pageNumber, note, bookId, title };
    const res = await axios.post("api/books/add-note", body, config);

    dispatch(setAlert(`Note added to ${res.data.title}`, "success"));
    dispatch(getCurrentProfile())
    return true;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const editNote = ({ noteId }) => async (dispatch) => {
  dispatch({
    type: "EDIT_NOTE",
    payload: noteId,
  });
};

export const deleteNote = ({ noteId, bookId }) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      const res = await axios.delete(
        `api/books/remove-note/${bookId}/${noteId}`
      );

      dispatch(setAlert("Note Removed", "success"))
      dispatch(getCurrentProfile())
      return true;
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }
  } else {
    return false;
  }
};

export const updateNote = ({ noteInfo, noteType, pageNumber, note, bookId, noteId }) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const body = { noteInfo, noteType, pageNumber, note, bookId };
    const res = await axios.put(`api/books/update-note/${noteId}`, body, config);
    dispatch(getCurrentProfile())
    dispatch(setAlert("Note Updated", "success"))
    return true;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
