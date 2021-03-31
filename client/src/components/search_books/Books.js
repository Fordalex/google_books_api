import React, { Fragment, useEffect, useState } from "react";
import Loading from "../../static/img/book-loading.gif";
import Book from "./Book";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Books = ({ books, apiData , setBookIndex}) => {
  return (
    <Fragment>
      {apiData.loading ? (
        <Fragment>
          {books.loading ? (
            <img src={Loading} id='loading' />
          ) : (
            <p class='m-2 text-secondary'>{apiData.msg}</p>
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

Books.propTypes = {
  books: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  books: state.books
})

export default connect(mapStateToProps)(Books);