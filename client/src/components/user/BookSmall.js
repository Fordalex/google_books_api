import React from "react";
import anime from "animejs/lib/anime.es.js";
import { Link } from "react-router-dom";
import { setBookIndex } from "../../actions/books";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { addBookId } from "../../actions/profile"; 

const BookSmall = ({ book, index, addBookId }) => {
  // Check if book has image
  var imgLink = "";
  try {
    imgLink = book.img;
  } catch {
    imgLink = "";
  }

  // check authors
  try {
    var authors = book.volumeInfo.authors.map((author) => (
      <span>{author}, </span>
    ));
  } catch {
    var authors = "";
  }

  const bookIdHandler = (b) => {
    addBookId({id: b._id})
  }

  return (
    <Link to="book-data" class='small-book-img-container' onClick={() => bookIdHandler(book)}>
        {imgLink ? (
          <img class='book-img' src={imgLink} />
        ) : (
          <p class='book-img'>No Image</p>
        )}
      </Link>
  );
};

BookSmall.propTypes = {
  setBookIndex: PropTypes.func.isRequired,
  addBookId: PropTypes.func.isRequired,
};

export default connect(null, { setBookIndex, addBookId })(BookSmall);
