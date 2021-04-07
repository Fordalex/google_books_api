import axios from "axios";
import anime from "animejs/lib/anime.es.js";
import { setAlert } from "../actions/alert";
const stringifyObject = require("stringify-object");

export const getBooks = ({ srch }) => async (dispatch) => {
  try {
    dispatch({
      type: "SEARCHING_BOOKS",
    });
    const res = await axios.get(`/api/books/${srch}`);

    dispatch({
      type: "SEARCHED_BOOKS",
      payload: res.data,
    });

    // animate book load
    anime({
      targets: ".book-container",
      keyframes: [
        { rotate: "-80deg", translateX: "-100vw", duration: 0 },
        { rotate: "0deg", translateX: "0px", duration: 800 },
      ],
      opacity: 1,
      delay: anime.stagger(100, { easing: "easeOutQuad" }),
    });
    anime({
      targets: ".book-img-container",
      keyframes: [
        { rotate: "180deg", duration: 0 },
        { rotate: "0deg", duration: 1500 },
      ],
      opacity: 1,
      delay: anime.stagger(100, { easing: "easeOutQuad" }),
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const setBookIndex = ({ idNum }) => async (dispatch) => {
  dispatch({
    type: "BOOK_INDEX",
    payload: idNum,
  });
};

export const addBook = ({
  uncompletedReason,
  readingStatus,
  currentPage,
  finishedDate,
  startDate,
  finished,
  title,
  img,
  bookId,
  rating,
  totalPages,
  categories
}) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const body = {
    uncompletedReason,
    readingStatus,
    currentPage,
    finishedDate,
    startDate,
    finished,
    title,
    img,
    bookId,
    rating,
    totalPages,
    categories
  };
  
  stringifyObject(body, {
    indent: "  ",
    singleQuotes: false,
  });

  try {
    dispatch(setAlert(`${title} added.`, "success"));
    const res = await axios.post("/api/books/add", body, config);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const removeBook = ({ id, title }) => async (dispatch) => {
  if (window.confirm("Are you sure? This can Not be undone!")) {
    try {
      const res = await axios.delete(`api/books/remove/${id}`);

      dispatch(setAlert(`${title} removed`, "success"));
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

export const updateBook = ({
  
  uncompletedReason,
  readingStatus,
  startDate,
  finishedDate,
  currentPage,
  finished,
  title,
  img,
  bookId,
  rating,
  totalPages,
}) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const body = {
    uncompletedReason,
    readingStatus,
    startDate,
    finishedDate,
    currentPage,
    finished,
    title,
    img,
    bookId,
    rating,
    totalPages,
  };

  try {
    const res = await axios.put(`api/books/update/${bookId}`, body, config);
    return true;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
