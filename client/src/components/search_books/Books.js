import React, { Fragment, useEffect } from "react";
import Loading from "../../static/img/book-loading.gif";
import Book from "./Book";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import anime from "animejs/lib/anime.es.js";

const Books = ({ books: {books, loading}, setBookIndex}) => {

  useEffect(() => {
    anime({
      targets: ".book-container",
      keyframes: [
        { rotate: "-80deg", translateX: "-100vw", duration: 0 },
        { rotate: "0deg", translateX: "0px", duration: 800 },
      ],
      opacity: 1,
      delay: anime.stagger(100, { easing: "easeOutQuad" }),
    });
    anime({
      targets: ".book-img-container",
      keyframes: [
        { rotate: "180deg", duration: 0 },
        { rotate: "0deg", duration: 1500 },
      ],
      opacity: 1,
      delay: anime.stagger(100, { easing: "easeOutQuad" }),
    });
  }, [])

  return (
    <Fragment>
      {!books ? (
        <Fragment>
          {loading ? (
            <img src={Loading} id='loading' />
          ) : (
            <p class='m-2 text-secondary'>Please search a book title.</p>
          )}
        </Fragment>
      ) : (
        <Fragment>
            {books.items.map((book, index) => (
              <Book book={book} key={index} index={index} setBookIndex={setBookIndex}/>
            ))}
            <p class="m-1">Results: {books.items.length}</p>
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