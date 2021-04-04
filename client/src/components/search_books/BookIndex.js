import React, { Fragment, useState } from "react";
import Books from "./Books";
import Form from "./Form";
import BookInfo from "./BookInfo";

const BookIndex = () => {
  const [bookSearch, setBookSearch] = useState("Steven");
  const [apiData, setApiData] = useState({
    loading: true,
    msg: "Please search a book title.",
  });
  const [bookIndex, setBookIndex] = useState(0);

  return (
    <Fragment>
      <div class='search-book-page-container'>
        <div class='search-book-page-wrapper'>
          <div class='search-book-container'>
            <Form setBookSearch={setBookSearch} setApiData={setApiData} />
            <Books
              bookSearch={bookSearch}
              setApiData={setApiData}
              apiData={apiData}
              setBookIndex={setBookIndex}
            />
          </div>
          <div class='one-book-info-container'>
            <BookInfo bookIndex={bookIndex} apiData={apiData} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BookIndex;
