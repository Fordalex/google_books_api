import React from "react";
import anime from "animejs/lib/anime.es.js";
import {getBooks} from '../../actions/books';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// api key
const {REACT_APP_GOOGLE_API_KEY} = process.env;

console.log(process.env)

const Form = ({ getBooks }) => {

   // Animate books on load
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

  const searchBookHandler = async (e) => {
    e.preventDefault();
    const search = document.getElementById("searchInput").value;
    getBooks(search);
  };


  return (
    <form onSubmit={searchBookHandler} id='bookForm'>
      <img src='https://img.icons8.com/ios-glyphs/30/000000/search.png' />
      <input type='text' id='searchInput' placeholder='Search...' autoComplete="off"/>
      <button>Search</button>
    </form>
  );
};

Form.propTypes = {
  getBooks: PropTypes.func.isRequired,
}

export default connect(null, {getBooks})(Form);