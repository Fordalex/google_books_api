import React from "react";
import {Link} from "react-router-dom";
import { setBookIndex } from "../../../actions/books";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from 'react-moment';
import { addBookId } from "../../../actions/profile"; 

const BookMedium = ({ book, index, addBookId }) => {
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
    <div class='book-container opacity-1'>
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
        <Link to="book-data" class='small-book-img-container' onClick={() => bookIdHandler(book)}>
          <img 
            class='info-icon'
        src="https://img.icons8.com/fluent/50/000000/information.png"/>
        </Link>
      </div>
    </div>
  );
};

BookMedium.propTypes = {
  setBookIndex: PropTypes.func.isRequired,
  addBookId: PropTypes.func.isRequired,
};

export default connect(null, { setBookIndex, addBookId })(BookMedium);
