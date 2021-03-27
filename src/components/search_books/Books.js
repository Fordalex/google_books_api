import React, { Fragment, useEffect, useState } from "react";
import Loading from "../../static/img/book-loading.gif";
import Book from "./Book";

const Books = ({ bookSearch, setApiData, apiData , setBookIndex}) => {
  return (
    <Fragment>
      {apiData.loading ? (
        <Fragment>
          {apiData.msg === "loading" ? (
            <img src={Loading} id='loading' />
          ) : (
            <p class='m-2'>{apiData.msg}</p>
          )}
        </Fragment>
      ) : (
        <Fragment>
            {apiData.book.items.map((book, index) => (
              <Book book={book} key={index} index={index} setBookIndex={setBookIndex}/>
            ))}
            <p class="m-1">Results: {apiData.book.items.length}</p>
            
        </Fragment>
      )}
    </Fragment>
  );
};

export default Books;
