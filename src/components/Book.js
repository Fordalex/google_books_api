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

  // Animate books on load
  anime({
    targets: ".book-container",
    keyframes: [
      { rotate: "-80deg", translateX: "-100vw", duration: 0 },
      { rotate: "0deg", translateX: "0px", duration: 800 },
    ],
    opacity: 1,
    delay: anime.stagger(50, { easing: "easeOutQuad" }),
  });

  anime({
    targets: ".book-img-container",
    keyframes: [
      { rotate: "180deg", duration: 0 },
      { rotate: "0deg", duration: 1500 },
    ],
    opacity: 1,
    delay: anime.stagger(50, { easing: "easeOutQuad" }),
  });

  // Show book information
  const showBookInfoHandler = (e) => {
    let idNum = e.target.id.split("-")[2];
    setBookIndex(idNum);

    anime({
      targets: ".search-book-container",
      translateX: "-110vw",
      loop: false,
      duration: 800,
    });
    let bookInfoContainer = document.getElementsByClassName(
      "one-book-info-container"
    )[0];
    bookInfoContainer.style.display = "block";
    anime({
      targets: ".one-book-info-container",
      keyframes: [
        { translateX: "110vw", duration: 0 },
        { translateX: "0px", duration: 800 },
      ],
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

        <p class='autor'>{book.volumeInfo.authors}</p>

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
          src='https://img.icons8.com/flat-round/64/000000/info.png'
        />
      </div>
    </div>
  );
};

export default Book;
