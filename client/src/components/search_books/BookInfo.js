import React from "react";
import anime from "animejs/lib/anime.es.js";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const BookInfo = ({ books: {books, bookIndex } }) => {
  // go back to book search.
  const backHandler = () => {

    anime({
      targets: ".one-book-info-container",
      keyframes: [
        { translateX: "200vw", duration: 500 },
      ],
      easing: 'easeInOutQuad',
      loop: false,
    });

    setTimeout(() => {
      let bookInfoContainer = document.getElementsByClassName(
        "one-book-info-container"
      )[0];
      bookInfoContainer.style.display = "none";
    }, 500)

   
  };

  //   Check if book has title
  try {
    var title = books.items[bookIndex].volumeInfo.title;
  } catch {
    return <div></div>;
  }

   // check authors 
   try {
    var authors = books.items[bookIndex].volumeInfo.authors.map((author) => (
      <span>{author}, </span>
    ));
  } catch {
    var authors = '';
  }

  // Check if book has image
  var imgLink = "";
  try {
    imgLink =
      books.items[bookIndex].volumeInfo.imageLinks.thumbnail;
  } catch {
    imgLink = "";
  }

  return (
    <div>
      <div>
      <img onClick={backHandler} class="info-back-button" src="https://img.icons8.com/ios/35/000000/circled-left-2.png"/>
      </div>

      {imgLink ? (
        <img class='book-info-img' src={imgLink} />
      ) : (
        <p class='book-info-img'>No Image</p>
      )}
      <div class='book-all-info-container'>
        <div class="book-all-title-container">
          <div>
            <h3>{title}</h3>
            <p>{books.items[bookIndex].volumeInfo.subtitle}</p>
            <small class="mb-3">Author: {authors}</small>
          </div>
          <div class="d-flex-center">
            <img class="love-icon" src='https://img.icons8.com/material-outlined/24/000000/filled-like.png' />
          </div>
        </div>

        <hr/>
        <div class="justify-content-between align-items-center">
          <div class="justify-content-between align-items-center w-100">
            <div class="justify-content-between align-items-center">
            <img class="rating-icon m-1" src='https://img.icons8.com/color/25/000000/filled-star--v1.png' />
            <p class="rating">Rating</p>
            </div>
          {books.items[bookIndex].volumeInfo.averageRating ? (
          <p class='rating m-1'>
            {books.items[bookIndex].volumeInfo.averageRating} / 5
          </p>
        ) : (
          <p class='rating m-1'>
            N/A
          </p>
        )}
          </div>
        </div>
        <hr/>

        {books.items[bookIndex].volumeInfo.description ? (
          <p>{books.items[bookIndex].volumeInfo.description}</p>
        ): (
          <p>No Description</p>
        )}

          <Link class="add-book" to="add-book">Add Book</Link>

      </div>
    </div>
  );
};

BookInfo.propTypes = {
  books: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  books: state.books,
});

export default connect(mapStateToProps)(BookInfo);