import React from "react";
import axios from "axios";
import anime from "animejs/lib/anime.es.js";
// api key
const {REACT_APP_GOOGLE_API_KEY} = process.env;

const Form = ({ setBookSearch, setApiData }) => {
  const searchBookHandler = async () => {
  
  };

  return (
    <form onSubmit={searchBookHandler} id='bookForm'>
      <img src='https://img.icons8.com/ios-glyphs/30/000000/search.png' />
      <input type='text' id='searchInput' placeholder='Search...' autoComplete="off" />
      <button>Search</button>
    </form>
  );
};

export default Form;
