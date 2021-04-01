import React from "react";
import anime from "animejs/lib/anime.es.js";
import {Link} from "react-router-dom";
import { setBookIndex } from "../../actions/books";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from 'react-moment';

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
      <div class='view-all-book-info-container'>
        <h3>{book.title}</h3>
        <p class="justify-content-between"><b>Start Date:</b> <Moment format="DD/MM/YYYY">{book.startDate}</Moment></p>
        {book.finished ? (
          <p class="justify-content-between"><b>Finished Date:</b> <Moment format="DD/MM/YYYY">{book.finishedDate}</Moment></p>
        ):(
          <p class="justify-content-between"><b>Current Page:</b> {book.currentPage}</p>
        )}
        <p class="justify-content-between"><b>Notes:</b> {book.notes.length}</p>
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
