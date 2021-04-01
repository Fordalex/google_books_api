import React, { Fragment, useEffect } from "react";
import Loading from "../../static/img/book-loading.gif";
import Book from "./Book";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import anime from "animejs/lib/anime.es.js";

const Books = ({ profile: { profile: { user, reading, read }, loading } }) => {

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
              <h3>Reading</h3>
            {reading.map((book, index) => (
              <Book book={book} key={index} index={index}/>
            ))}
            <p class="m-1">Results: {reading.length}</p>
            <hr/>
            <h3>Read</h3>
            {read.map((book, index) => (
              <Book book={book} key={index} index={index}/>
            ))}
            <p class="m-1">Results: {read.length}</p>
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