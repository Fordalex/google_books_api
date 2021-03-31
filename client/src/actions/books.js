import axios from "axios";

export const getBooks = ({ search }) => async (dispatch) => {
  try {
    dispatch({ 
      type: "SEARCHING_BOOKS", 
    });

    const res = await axios.get(`/api/books/${search}`);

    dispatch({ 
        type: "SEARCHED_BOOKS", 
        payload: res.data, 
    });

  } catch (err) {
    return err;
  }
};
