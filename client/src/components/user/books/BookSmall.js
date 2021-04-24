import React from "react";
import { Link } from "react-router-dom";
import { setBookIndex } from "../../../actions/books";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBookId } from "../../../actions/profile"; 

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

  var rating = [];
  for (let i = 0; i < book.rating; i++) {
    rating.push('');
  }

  return (
    <Link to="/book-data" class='small-book-img-container' onClick={() => bookIdHandler(book)}>
        {imgLink ? (
          <img class='book-img' src={imgLink} />
        ) : (
          <p class='book-img'>No Image</p>
        )}
        <div class="small-book-rating-container">
          {
          book.readingStatus == 'read' && (
            rating.map((r) => {
              return <img src="https://img.icons8.com/fluent/14/000000/star.png"/>
            })
          )
          }
        </div>
      </Link>
  );
};

BookSmall.propTypes = {
  setBookIndex: PropTypes.func.isRequired,
  addBookId: PropTypes.func.isRequired,
};

export default connect(null, { setBookIndex, addBookId })(BookSmall);
