import React from 'react'

const Book = ({book}) => {
    var imgLink = '';

    try {
        imgLink = book.volumeInfo.imageLinks.smallThumbnail;
    } catch {
        imgLink = '';
    }

    return (
        <div class='book-container'>
              <div class='book-img-container'>
                {imgLink ? (
                    <img class='book-img' src={imgLink}/>
                ) : (
                    <p class="book-img">No Image</p>
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
                  class='add-icon'
                  src='https://img.icons8.com/flat-round/64/000000/info.png'
                />
              </div>
            </div>
    )
}

export default Book;