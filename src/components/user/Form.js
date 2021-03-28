import React from "react";
import axios from "axios";
import { apiKey } from "../../config/default.json";
import anime from "animejs/lib/anime.es.js";

const Form = ({ setBookSearch, setApiData }) => {
  const searchBookHandler = async (e) => {
    e.preventDefault();
    

    
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
