import axios from "axios";
import anime from "animejs/lib/anime.es.js";

export const getBooks = ({ srch }) => async (dispatch) => {
  try {
    dispatch({ 
      type: "SEARCHING_BOOKS", 
    });
    const res = await axios.get(`/api/books/${srch}`);

    dispatch({ 
        type: "SEARCHED_BOOKS", 
        payload: res.data, 
    });

    // animate book load
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

  } catch (err) {
    return err;
  }
};
