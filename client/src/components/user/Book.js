import React from "react";
import anime from "animejs/lib/anime.es.js";
import {Link} from "react-router-dom";
import { setBookIndex } from "../../actions/books";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Book = ({ book, index }) => {
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

  return (
    <div class='book-container'>
      <div class='book-img-container'>
        {imgLink ? (
          <img class='book-img' src={imgLink} />
        ) : (
          <p class='book-img'>No Image</p>
        )}
      </div>
      <div class='book-info-container'>
        <h3>{book.title}</h3>
        <p>Start Date: {book.startDate}</p>
        <p>Finished Date: {book.finishedDate}</p>
        <p>Current Page: {book.currentPage}</p>
        <p>Notes: {book.notes.length}</p>
        <Link to='book-data'>
          <img
            class='add-icon'
            id={"book-info-".concat(index)}
            src='https://img.icons8.com/fluent/48/000000/info.png'
          />
        </Link>
      </div>
    </div>
  );
};

Book.propTypes = {
  setBookIndex: PropTypes.func.isRequired,
};

export default connect(null, { setBookIndex })(Book);
