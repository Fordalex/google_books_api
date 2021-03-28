import React from "react";
import anime from "animejs/lib/anime.es.js";

const Book = ({ book, index, setBookIndex }) => {
  // Check if book has image
  var imgLink = "";
  try {
    imgLink = book.volumeInfo.imageLinks.smallThumbnail;
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
    setBookIndex(idNum);

    let bookInfoContainer = document.getElementsByClassName(
      "one-book-info-container"
    )[0];
    bookInfoContainer.style.display = "block";

    anime({
      targets: ".one-book-info-container",
      keyframes: [
        { translateX: "200vw", duration: 0 },
        { translateX: "0", duration: 1000 },
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

        <p class='autor'>{authors}</p>



        {book.volumeInfo.averageRating ? (
          <p class='rating'>
            <img src='https://img.icons8.com/color/25/000000/filled-star--v1.png' />{" "}
            {book.volumeInfo.averageRating} / 5
          </p>
        ) : (
          <p class='rating'>
            <img src='https://img.icons8.com/color/25/000000/filled-star--v1.png' />{" "}
            No Rating
          </p>
        )}

        {book.volumeInfo.pageCount ? (
          <small class='page-count'>
            <img src='https://img.icons8.com/color/25/000000/open-book--v1.png' />{" "}
            {book.volumeInfo.pageCount} Pages
          </small>
        ) : (
          <small class='page-count'>
            <img src='https://img.icons8.com/color/25/000000/open-book--v1.png' />{" "}
            No Info
          </small>
        )}

        {book.volumeInfo.publishedDate ? (
          <small class='page-count'>
            <img src='https://img.icons8.com/color/25/000000/date-to.png' />
            {book.volumeInfo.publishedDate}
          </small>
        ) : (
          <small class='page-count'>
            <img src='https://img.icons8.com/color/25/000000/date-to.png' />
            No Info
          </small>
        )}

        <img
          onClick={showBookInfoHandler}
          class='add-icon'
          id={"book-info-".concat(index)}
          src="https://img.icons8.com/fluent/48/000000/info.png"
        />
      </div>
    </div>
  );
};

export default Book;
