import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

const Books = ({ bookSearch, setApiData, apiData }) => {

  return (
    <Fragment>
      {apiData.loading ? (
        <Fragment>
          <p>Search: {bookSearch}</p>
          <p>Loading...</p>
        </Fragment>
      ) : (
        <Fragment>
            <h4>Search: {bookSearch}</h4>
          <h4>Total Results: {apiData.book.totalItems}</h4>
          <hr />

          {apiData.book.items.map((book, index) => (
            <div>
                <img src={book.volumeInfo.imageLinks.smallThumbnail}/>
              <p>Title: {book.volumeInfo.title}</p>

              <p>Author: </p>
              <p>
                {book.volumeInfo.authors}
              </p>

              <p>Page count: {book.volumeInfo.pageCount}</p>
              <p>Result: {index + 1}</p>
              <hr />
            </div>
          ))}

          <h4>Search Page Length: {apiData.book.items.length}</h4>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Books;
