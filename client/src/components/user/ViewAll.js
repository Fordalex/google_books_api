import React, { Fragment, useEffect, useState } from "react";
import Loading from "../../static/img/book-loading.gif";
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

  const bookSizeHandler = (e) => {
    setView(e.target.value)
  }

  return (
        <Fragment>
          <div class="p-1">
          <label>View Size</label>
          <select class="input-style" onChange={(e) => bookSizeHandler(e)}>
            <option value="medium">Medium</option>
            <option value="small">Small</option>
          </select>
          </div>
         
          <hr/>
              <h2 class="p-2 m-0">Reading</h2>

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
            <hr/>
            <h2 class="p-2 m-0">Read</h2>
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

Books.propTypes = {
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps)(Books);