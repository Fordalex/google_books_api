import React, { Fragment, useEffect, useState } from "react";
import BookMedium from "./BookMedium";
import BookSmall from "./BookSmall";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import anime from "animejs/lib/anime.es.js";

const Books = ({ profile: { profile: { user, books }, loading } }) => {

  const [view, setView] = useState('medium');

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
    // Filter the books the user is reading
    var reading = books.filter((book) =>
      book.readingStatus == "reading" ? book : null
    );
    // filter the books the user has read
    var read = books.filter((book) =>
      book.readingStatus == "read" ? book : null
    );
    // filter the books that the users hasn't completed
    var uncompleted = books.filter((book) =>
      book.readingStatus == "uncompleted" ? book : null
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
            <option value="medium">Medium</option>
            <option value="small">Small</option>
          </select>
          </div>
         
          <hr/>
              <h2 class="p-2 m-0">Reading</h2>

            {view == 'medium' ? (
              reading.map((book, index) => (
                <BookMedium book={book} key={index} index={index}/>
              ))
            ): (
              reading.map((book, index) => (
                <BookSmall book={book} key={index} index={index}/>
              ))
            )}
            <p class="m-1">Results: {reading.length}</p>
            <hr/>
            <h2 class="p-2 m-0">Read</h2>
            {view == 'medium' ? (
              read.map((book, index) => (
                <BookMedium book={book} key={index} index={index}/>
              ))
            ): (
              read.map((book, index) => (
                <BookSmall book={book} key={index} index={index}/>
              ))
            )}
            <p class="m-1">Results: {read.length}</p>
            <hr/>
            <h2 class="p-2 m-0">Uncompleted</h2>
            {view == 'medium' ? (
              uncompleted.map((book, index) => (
                <BookMedium book={book} key={index} index={index}/>
              ))
            ): (
              uncompleted.map((book, index) => (
                <BookSmall book={book} key={index} index={index}/>
              ))
            )}
            <p class="m-1">Results: {uncompleted.length}</p>
        </Fragment>
  );
};

Books.propTypes = {
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps)(Books);