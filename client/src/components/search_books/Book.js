import React from "react";
import anime from "animejs/lib/anime.es.js";
import {setBookIndex} from '../../actions/books';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Book = ({ book, index, setBookIndex }) => {
  // Check if book has image
  var imgLink = "";
  try {
    imgLink = book.volumeInfo.imageLinks.thumbnail;
  } catch {
    imgLink = "";
  }

  // check authors 
  try {
    var authors = book.volumeInfo.authors.map((author) => (
      <span>{author}, </span>
    ));
  } catch {
    var authors = '';
  }

  // Show book information
  const showBookInfoHandler = (e) => {
    let idNum = e.target.id.split("-")[2];
    setBookIndex({idNum});

    let bookInfoContainer = document.getElementsByClassName(
      "one-book-info-container"
    )[0];
    bookInfoContainer.style.display = "block";

    anime({
      targets: ".one-book-info-container",
      keyframes: [
        { translateX: "200vw", duration: 0 },
        { translateX: "0", duration: 500 },
      ],
      easing: 'easeInOutQuad',
      loop: false,
    });
  };

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
        <h3>{book.volumeInfo.title}</h3>
        <p class='mb-1 text-secondary'>{authors}</p>
        <hr/>
          <small class="justify-content-between">
            Rating: <span>{book.volumeInfo.averageRating ? book.volumeInfo.averageRating+" / 5" : "N/A"}</span>
          </small>
          <small class="justify-content-between">
            Pages: <span>{book.volumeInfo.pageCount ? book.volumeInfo.pageCount : "N/A"}</span>
          </small>
          <small class="justify-content-between">
            Published: <span>{book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : "N/A"}</span>
          </small>
          <small class="justify-content-between">
            Publisher: <span>{book.volumeInfo.publisher ? book.volumeInfo.publisher : "N/A"}</span>
          </small>
        <img 
            onClick={showBookInfoHandler}
            class='info-icon'
            id={"book-info-".concat(index)}
        src="https://img.icons8.com/fluent/50/000000/information.png"/>
      </div>
    </div>
  );
};

Book.propTypes = {
  setBookIndex: PropTypes.func.isRequired,
}

export default connect(null, {setBookIndex})(Book);