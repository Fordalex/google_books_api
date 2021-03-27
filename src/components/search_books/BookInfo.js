import React from "react";
import anime from "animejs/lib/anime.es.js";

const BookInfo = ({ apiData, bookIndex }) => {
  // go back to book search.
  const backHandler = () => {

    anime({
      targets: ".one-book-info-container",
      keyframes: [
        { translateX: "200vw", duration: 1000 },
      ],
      loop: false,
    });

    setTimeout(() => {
      let bookInfoContainer = document.getElementsByClassName(
        "one-book-info-container"
      )[0];
      bookInfoContainer.style.display = "none";
    }, 1000)

   
  };

  //   Check if book has title
  try {
    var title = apiData.book.items[bookIndex].volumeInfo.title;
  } catch {
    return <div></div>;
  }

  // Check if book has image
  var imgLink = "";
  try {
    imgLink =
      apiData.book.items[bookIndex].volumeInfo.imageLinks.thumbnail;
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
            <p>{apiData.book.items[bookIndex].volumeInfo.subtitle}</p>
            <small class="mb-3">Author: {
            apiData.book.items[bookIndex].volumeInfo.authors.map((author) => (
              <span>{author}, </span>
            ))
            }</small>
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
          {apiData.book.items[bookIndex].volumeInfo.averageRating ? (
          <p class='rating m-1'>
            {apiData.book.items[bookIndex].volumeInfo.averageRating} / 5
          </p>
        ) : (
          <p class='rating m-1'>
            N/A
          </p>
        )}
          </div>
        </div>
        <hr/>

        <p>{apiData.book.items[bookIndex].volumeInfo.description}</p>

          <button class="add-book">Add Book</button>

      </div>
    </div>
  );
};

export default BookInfo;
