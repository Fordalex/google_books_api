import React, { Fragment, useEffect, useState } from "react";
import BookMedium from "./BookMedium";
import BookSmall from "./BookSmall";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import anime from "animejs/lib/anime.es.js";

const ViewBooksByCategory = ({ profile: { profile: { user, books }, loading }, books: {filteredBooksCategory} }) => {

  const [view, setView] = useState('small');

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

   // Filter the books the user has and hasn't read.
   try {
     console.log(books)
    // Filter the books the user is reading
    var books = books.filter((book) =>
      book.categories.includes(filteredBooksCategory) ? book : null
    );
  } catch(err) {
    return null
  }

  const bookSizeHandler = (e) => {
    setView(e.target.value)
  }

  return (
        <Fragment>
          <div class="p-1 form-group">
          <p>View Size</p>
          <select class="input-style" onChange={(e) => bookSizeHandler(e)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
          </select>
          </div>
         
          <hr/>
              <h2 class="p-2 m-0 capitalize">{filteredBooksCategory}</h2>

            {view == 'medium' ? (
              books.map((book, index) => (
                <BookMedium book={book} key={index} index={index}/>
              ))
            ): (
              books.map((book, index) => (
                <BookSmall book={book} key={index} index={index}/>
              ))
            )}
            <p class="m-1">Results: {books.length}</p>
            
        </Fragment>
  );
};

ViewBooksByCategory.propTypes = {
    profile: PropTypes.object.isRequired,
    books: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  books: state.books
})

export default connect(mapStateToProps)(ViewBooksByCategory);